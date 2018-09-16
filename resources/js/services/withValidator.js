import React, { Component } from 'react';
import Validator from 'validatorjs';

const withValidator = (options) => {
  return (WrappedComponent) => {
    return class ValidatorForm extends Component {
      constructor(props) {
        super(props);
        this.rules = options.rules;
        this.setData = options.setData;
        this.setData = this.setData.bind(this);
        this.makeValidator = this.makeValidator.bind(this);
        this.makeAllDirty = this.makeAllDirty.bind(this);
        const dirty = {};
        Object.keys(this.setData(props)).forEach((key) => {
          dirty[key] = false;
        });
        this.state = {
          dirty,
          errors: {},
        };
      }
      componentDidUpdate(prevProps) {
        const dirty = { ...this.state.dirty };
        const prevData = this.setData(prevProps);
        const data = this.setData(this.props);

        let notEquanlNum = 0;
        Object.keys(data).forEach((key) => {
          if (prevData[key] !== data[key]) {
            notEquanlNum += 1;
          }
        });
        if (notEquanlNum === 0) {
          return;
        }
        Object.keys(data).forEach((key) => {
          dirty[key] = dirty[key] || prevData[key] !== data[key];
        });
        this.setState({ dirty });
        const validation = new Validator(data, this.rules);
        validation.fails();
        this.setState({ errors: validation.errors });
      }
      makeValidator() {
        return new Validator(this.setData(this.props), this.rules);
      }
      makeAllDirty() {
        const dirty = {};
        Object.keys(this.setData(this.props)).forEach((key) => {
          dirty[key] = true;
        });
        this.setState({ dirty });
      }
      render() {
        const props = {
          ...this.props,
          dirty: this.state.dirty,
          errors: this.state.errors,
          makeValidator: this.makeValidator,
          makeAllDirty: this.makeAllDirty,
        };
        return <WrappedComponent {...props} />;
      }
    };
  };
};

export default withValidator;
