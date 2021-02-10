import * as React from 'react';
import nextId from "react-id-generator";
interface IProps<T> {
    value?: T;
    options: Array<{
        label: string,
        value: T,
        icon?: string;
        labelHidden?: boolean,
        disabled?: boolean
    }>;
    required?: boolean;
    onChange(nextValue: boolean): void;
}
export class RadioButton<T> extends React.Component<IProps<T>> {
    htmlId = nextId();

    constructor(props: IProps<T>) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(item: any) {
        if (!item.disabled) {
            this.props.onChange(item.value);
        }
    }

    render() {
        return (
            <div className="sd-check-button__group sd-check-button__group--left">{
                this.props.options.map((item: any, index: number) => (
                    <span className="sd-check-button sd-check-button--native"
                        key={index}
                        tabIndex={-1}>

                        <input type="radio" className="sd-check-button__input"
                            id={this.htmlId + index}
                            tabIndex={0}
                            name={this.htmlId}
                            onChange={() => this.handleChange(item)}
                            disabled={item.disabled}
                            required={this.props.required} />

                        <label className="sd-check-button__text-label" htmlFor={this.htmlId + index} 
                            aria-label={item.labelHidden ? item.label : undefined}>

                            { item.icon ?  <i className={`icon-${item.icon}`} aria-hidden="true" /> : null }
                            { !item.labelHidden || !item.icon ?
                                <span className="sd-check-button__text-label-inner">Button style rules!</span> : null }
                        </label>
                    </span>
                ))
            }</div>
        );
    }
}
