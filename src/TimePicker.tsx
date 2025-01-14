import {DOMElement} from "react";
import * as React from "react";
import { Portal } from "react-portal";
import "./styles.scss";

interface IProps {
    appendTo: string | null;
    value: Date | string | null;
    name: string;
    timeFormat: string;
    normalizeTime: boolean;
    step: number;
    minTime: string | null;
    maxTime: string | null;
    includeMax: boolean;
    inputClass: string;
    className?: string;
    hideOnScroll: boolean;
    allowOnlySuggestions: boolean;
    onChange(value: string | Date): void;
    getInput(value: HTMLElement);
}

interface IState {
    value: number;
    inputValue: string;
    showSuggestions: boolean;
    suggestions: number[];
    suggestionsPosition: {
        left: number,
        top: number,
    } | null;
    highlightedSuggestionIndex: number | null;
}

const ONE_DAY_IN_SECONDS = 86400;

class TimePicker extends React.Component<IProps, IState> {
    static defaultProps: Partial<IProps> = {
        allowOnlySuggestions: false,
        appendTo: "body",
        hideOnScroll: false,
        includeMax: true,
        inputClass: "",
        maxTime: null,
        minTime: null,
        name: "",
        normalizeTime: true,
        step: 30,
        timeFormat: "hh:mma",
        value: null,
    };

    inputEl?: HTMLInputElement;
    labelEl?: HTMLLabelElement;
    wrapperEl?: HTMLDivElement;
    suggestionsWrapperEl?: HTMLDivElement;
    suggestionEl?: HTMLButtonElement;

    constructor(props: IProps) {
        super(props);

        const {
            value,
            step,
            minTime,
            maxTime,
        } = props;

        const seconds = this.convertTimeToSeconds(value);

        this.state = {
            highlightedSuggestionIndex: null,
            inputValue: seconds ? this.convertSecondsToFormattedString(seconds) : "",
            showSuggestions: false,
            suggestions: this.createSuggestions(step, minTime, maxTime),
            suggestionsPosition: null,
            value: seconds,
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown);
        if (this.props.hasOwnProperty("getInput") && typeof this.props.getInput === "function") {
            this.props.getInput(this.inputEl);
        }
    }

    componentDidUpdate(prevProps: IProps) {
        const { value } = this.props;

        let isValueChanged = false;

        if ((!prevProps.value && value) || (prevProps.value && !value)) {
            isValueChanged = true;
        } else if (value instanceof Date && prevProps.value instanceof Date) {
            isValueChanged = prevProps.value.getTime() !== value.getTime();
        } else if (typeof value === "string" && typeof prevProps.value === "string") {
            isValueChanged = prevProps.value !== value;
        }

        if (isValueChanged) {
            const seconds = this.convertTimeToSeconds(value);

            this.setState({
                inputValue: seconds ? this.convertSecondsToFormattedString(seconds) : "",
                value: seconds,
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown);
    }

    /**
     * Calls onChange handler.
     * If initial value was Date, returns Date, otherwise returns parsed string
     * or non-parsed if parsing wasn't successful
     * @param seconds
     */
    onChange = (seconds: number) => {
        const { onChange } = this.props;

        if (onChange) {
            if (this.props.value instanceof Date) {
                const time = this.convertSecondsToDate(seconds);

                onChange(new Date(
                    this.props.value.getFullYear(),
                    this.props.value.getMonth(),
                    this.props.value.getDate(),
                    time.getHours(),
                    time.getMinutes(),
                    time.getSeconds(),
                ));
            } else {
                const {
                    value,
                    inputValue,
                } = this.state;

                onChange(value ? this.convertSecondsToFormattedString(seconds) : inputValue);
            }
        }
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = this.convertTimeToSeconds(e.target.value);

        this.setState({
            inputValue: e.target.value,
            value,
        }, () => {
            const { showSuggestions } = this.state;

            if (showSuggestions) {
                this.scrollSuggestionList(value);
            } else {
                this.showSuggestions();
            }

            this.onChange(value);
        });
    }

    onInputBlur = () => {
        if (this.state.value !== null) {
            this.setState({
                inputValue: this.convertSecondsToFormattedString(this.state.value)
            });
        }
    }

    onInputFocus = () => {
        this.showSuggestions();
    }

    onInputClick = () => {
        if (!this.state.showSuggestions) {
            this.showSuggestions();
        }
    }

    /**
     * Sets value and input value, calls onChange handler on suggestion select
     * @param e
     */
    onSuggestionSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        const seconds = parseInt((e.target as HTMLButtonElement).value, 10);

        this.setState({
            inputValue: this.convertSecondsToFormattedString(seconds),
            value: seconds,
        }, () => {
            this.hideSuggestions();
            this.onChange(seconds);
        });
    }

    onArrowUpDown = (direction: "up" | "down") => {
        const {
            value,
            suggestions,
            highlightedSuggestionIndex : index,
        } = this.state;

        let newIndex = 0;

        if (index === null) {
            if (value) {
                const valueIndex = suggestions.findIndex(s => this.isNearestSuggestion(value, s));
                newIndex = direction === "down" ? valueIndex + 1 : valueIndex - 1;
            } else {
                newIndex = 0;
            }
        } else {
            newIndex = direction === "down" ? index + 1 : index - 1;
        }

        if (newIndex < 0) {
            newIndex = 0;
        }

        if (newIndex === suggestions.length) {
            newIndex = suggestions.length - 1;
        }

        if (newIndex !== index) {
            this.setState({
                highlightedSuggestionIndex: newIndex,
            }, () => {
                this.scrollSuggestionList(this.state.suggestions[newIndex]);
            });
        }
    }

    onKeyDown = (e: KeyboardEvent) => {
        if (this.inputEl !== document.activeElement) {
            return;
        }

        switch (e.key) {
            case "Escape":
                this.hideSuggestions();
                break;
            case "Enter": {
                const {
                    highlightedSuggestionIndex,
                    value,
                    suggestions,
                } = this.state;

                if (!highlightedSuggestionIndex) {
                    this.setState({
                        inputValue: this.convertSecondsToFormattedString(value),
                    });
                } else {
                    const selectedValue = suggestions[highlightedSuggestionIndex];

                    this.setState({
                        inputValue: this.convertSecondsToFormattedString(selectedValue),
                        value: selectedValue,
                    });

                    this.onChange(selectedValue);
                }

                this.hideSuggestions();
                break;
            }
            case "ArrowUp": {
                this.onArrowUpDown("up");
                break;
            }
            case "ArrowDown": {
                if (this.state.showSuggestions) {
                    this.onArrowUpDown("down");
                } else {
                    this.showSuggestions();
                }
                break;
            }
            case "Tab": {
                if (this.state.showSuggestions) {
                    this.hideSuggestions();
                }
                break;
            }
            default:
        }
    }

    /**
     * Adds zero to number if number is less than 10 (used for formatting)
     * @param value
     */
    prependZero = (value: number): string => {
        return value < 10 ? `0${value}` : value.toString();
    }

    /**
     * Converts seconds to Date object
     * @param timeInt
     */
    convertSecondsToDate = (timeInt: number): Date => {
        const seconds = timeInt % 60;
        const minutes = (timeInt / 60) % 60;
        const hours = (timeInt / (60 * 60)) % 24;

        return new Date(1970, 0, 2, hours, minutes, seconds, 0);
    }

    /**
     * Converts seconds to string based on time format
     * @param timeInt
     * @return string
     */
    convertSecondsToFormattedString = (timeInt: number): string => {
        const { timeFormat } = this.props;
        const time = this.convertSecondsToDate(timeInt);

        return timeFormat.split("").reduce((str, letter, i, source) => {
            if (i > 0 && source[i - 1] === letter) {
                return str;
            }

            switch (letter) {
                case "a":
                    return str += time.getHours() > 11 ? "pm" : "am";
                case "h": {
                    const hours = time.getHours() % 12;

                    if (hours === 0) {
                        return str += "12";
                    }

                    return str += this.prependZero(hours);
                }
                case "H":
                    return str += this.prependZero(time.getHours());
                case "m":
                    return str += this.prependZero(time.getMinutes());
                case "s":
                    return str += this.prependZero(time.getSeconds());
                default:
                    return str += letter;
            }
        }, "");
    }

    /**
     * Converts time string to seconds
     * @param time
     */
    convertTimeToSeconds = (time: string | Date | null): number | null => {

        if (time === "" || time === null) {
            return null;
        }

        if (time instanceof Date) {
            return time.getHours() * 3600 +
                time.getMinutes() * 60 +
                time.getSeconds();
        }

        let str = time.toLowerCase().replace(/[\s]/g, '');

        if (str.slice(-1) === "a" || str.slice(-1) === "p") {
            str += "m";
        }

        const ampmGroup = "(am|pm|AM|PM)?";
        const pattern = new RegExp(
            `^${ampmGroup}([0-9]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?${ampmGroup}$`,
        );

        const timeParts = str.match(pattern);

        if (!timeParts) {
            return null;
        }

        const hour = parseInt(timeParts[2], 10);
        const minutes = parseInt(timeParts[3], 10) || 0;
        const seconds = parseInt(timeParts[4], 10) || 0;
        const ampm = timeParts[1] || timeParts[5];
        let hours = hour;

        if (hour <= 12 && ampm) {
            const isPm = ampm === "pm" || ampm === "PM";

            if (hour === 12) {
                hours = isPm ? 12 : 0;
            } else {
                hours = hour + (isPm ? 12 : 0);
            }
        }

        let timeInSeconds = hours * 3600 + minutes * 60 + seconds;

        if (timeInSeconds > ONE_DAY_IN_SECONDS) {
            if (this.props.normalizeTime) {
                timeInSeconds = (hour % 24) * 3600 + minutes * 60 + seconds;
            } else {
                return null;
            }
        }

        if (this.props.allowOnlySuggestions) {
            return this.roundTime(timeInSeconds);
        }

        // костыль, чтобы выбрать 00:00
        if (timeInSeconds === 0) {
            timeInSeconds = 1;
        }

        return timeInSeconds;
    }

    /**
     * Hides suggestion list on outside click
     * @param e
     */
    hideSuggestionsOnOutsideClick = (e: MouseEvent) => {
        if (e.target !== this.inputEl && this.suggestionsWrapperEl &&
            !this.suggestionsWrapperEl.contains(e.target as Node)) {
            this.hideSuggestions();
        }
    }

    hideSuggestionsOnScroll = () => {
        if (this.state.showSuggestions) {
            this.hideSuggestions();
        }
    }

    showSuggestions = () => {
        this.setState({
            showSuggestions: true,
        }, () => {
            this.positionSuggestions();
            this.scrollSuggestionList(this.state.value);

            document.addEventListener("click", this.hideSuggestionsOnOutsideClick);

            if (this.props.hideOnScroll) {
                window.addEventListener("scroll", this.hideSuggestionsOnScroll);
            }
        });
    }

    hideSuggestions = () => {
        this.setState({
            highlightedSuggestionIndex: null,
            showSuggestions: false,
            suggestionsPosition: null,
        }, () => {
            document.removeEventListener("click", this.hideSuggestionsOnOutsideClick);

            if (this.props.hideOnScroll) {
                window.removeEventListener("scroll", this.hideSuggestionsOnScroll);
            }
        });
    }

    positionSuggestions = () => {
        const inputBounds = this.inputEl.getBoundingClientRect();
        const docEl = document.documentElement;
        const scrollTop = (window.pageYOffset || docEl.scrollTop)  - (docEl.clientTop || 0);
        const suggestionsBounds = !!this.suggestionsWrapperEl && this.suggestionsWrapperEl.getBoundingClientRect();
        const suggestionsHeight = suggestionsBounds ? suggestionsBounds.height : 0;
        const wH = window.innerHeight || docEl.clientHeight || document.body.clientHeight;

        let left;
        let top;
        if (this.props.appendTo === null) {
            left = 0;
            top = inputBounds.height;
        } else {
            left = inputBounds.left;
            top = inputBounds.top + inputBounds.height + scrollTop;
        }

        if (wH - (inputBounds.top + inputBounds.height) < suggestionsHeight) {
            top = inputBounds.top - suggestionsHeight + scrollTop;
        }

        this.setState({
            suggestionsPosition: {
                left,
                top,
            },
        });
    }

    /**
     * Scrolls suggestion list to the highlighted suggestion
     */
    scrollSuggestionList = (value: number) => {
        const {
            suggestions,
            showSuggestions,
        } = this.state;

        if (!this.suggestionsWrapperEl || !showSuggestions) {
            return;
        }

        const height = this.suggestionEl ? this.suggestionEl.offsetHeight : 0;

        if (!value) {
            this.suggestionsWrapperEl.scrollTop = 0;
        } else {
            for (let i = 0; i < suggestions.length; i++) {
                if (Math.abs(value - suggestions[i]) <= this.props.step * 30) {
                    this.suggestionsWrapperEl.scrollTop = (height * i) - height;
                    break;
                }
            }
        }
    }

    /**
     * Creates an array of suggestions in seconds
     * @param step - time in minutes between two suggestions
     * @param minTime - suggestions start time
     * @param maxTime - suggestions end time (by default it is one day in seconds)
     */
    createSuggestions = (step: number, minTime: string | null, maxTime: string | null): Array<number> => {
        const stepInSeconds = step * 60;
        let nextSuggestion = this.convertTimeToSeconds(minTime) || 0;
        const maxTimeInt = this.convertTimeToSeconds(maxTime) || ONE_DAY_IN_SECONDS;

        const suggestions = [];
        while (this.props.includeMax && maxTimeInt < ONE_DAY_IN_SECONDS ?
            nextSuggestion <= maxTimeInt : nextSuggestion < maxTimeInt) {
            suggestions.push(nextSuggestion);
            nextSuggestion += stepInSeconds;
        }

        return suggestions;
    }

    /**
     * Round time to the nearest suggestion,
     * it is used if allowOnlySuggestion props equals true
     * @param seconds
     */
    roundTime = (seconds: number): number => {
        const { step } = this.props;
        const stepInSeconds = step * 60;
        const offset = seconds % stepInSeconds;

        if (offset >= stepInSeconds / 2) {
            return seconds += stepInSeconds - offset;
        }

        return seconds -= offset;
    }

    isNearestSuggestion = (value: number, suggestion: number) => {
        return Math.abs(value - suggestion) < (this.props.step * 30 / 2);
    }

    renderSuggestions = () => {
        const {
            highlightedSuggestionIndex,
            showSuggestions,
            suggestionsPosition,
            suggestions,
            value,
        } = this.state;

        const {
            appendTo,
        } = this.props;

        const markup = (
            <div
                className="time-picker__suggestion-list"
                ref={(el) => { this.suggestionsWrapperEl = el; }}
                style={{
                    display: showSuggestions ? "block" : "none",
                    left: suggestionsPosition ? suggestionsPosition.left : -9999,
                    top: suggestionsPosition ? suggestionsPosition.top : -9999,
                    zIndex: 999999,
                }}
            >
                {suggestions.map((suggestion: number, i: number) => (
                    <button
                        value={suggestion}
                        key={`${name}-${suggestion}`}
                        type="button"
                        className={`time-picker__suggestion ${
                            (highlightedSuggestionIndex !== null && highlightedSuggestionIndex === i) ||
                            (highlightedSuggestionIndex === null && value &&
                                this.isNearestSuggestion(value, suggestion)) ?
                                "time-picker__suggestion_selected" : ""}`}
                        onClick={this.onSuggestionSelect}
                        tabIndex={-1}
                        ref={(el) => {
                            if (i === 0) {
                                this.suggestionEl = el;
                            }
                        }}
                    >
                        {this.convertSecondsToFormattedString(suggestion)}
                    </button>
                ))}
            </div>
        )

        if (appendTo === null) {
            return markup;
        }

        return (
            <Portal node={appendTo !== "body" && document && document.querySelector(appendTo)}>
                {markup}
            </Portal>
        );
    }

    render() {
        const {
            className,
            inputClass,
        } = this.props;

        const {
            suggestions,
            showSuggestions,
        } = this.state;

        return (
            <div className={`time-picker ${className ? className : ""}`}>
                <label
                    ref={(el) => {
                        this.labelEl = el;
                    }}
                >
                    <input
                        type="time"
                        className={`time-picker__input ${inputClass}`}
                        value={this.state.inputValue}
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        onFocus={this.onInputFocus}
                        onClick={this.onInputClick}
                        ref={(el) => {
                            this.inputEl = el;
                        }}
                        aria-label="Label text"
                    />
                </label>
                {((showSuggestions && suggestions.length > 0) || this.suggestionsWrapperEl) &&
                this.renderSuggestions()
                }
            </div>
        );
    }
}

export default TimePicker;
