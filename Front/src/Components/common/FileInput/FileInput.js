import React, {Component} from 'react'

export default class FieldFileInput extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const {input: {onChange}} = this.props
        if (e.target.files[0])
            this.props.changeValue(e.target.files[0].name)
        else
            this.props.changeValue(undefined);
        onChange(e.target.files[0])
    }

    render() {
        const {input: {value}} = this.props
        const {input, label, required, meta,} = this.props  //whatever props you send to the component from redux-form Field
        return (
            <div className={this.props.className}><label>{label}</label>
                <div>
                    <input
                        id={this.props.id}
                        type='file'
                        accept='.jpg, .png, .jpeg'
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}