import './SelectFromApi.css';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Select from 'react-select';

const selectStyles = isValid => ({
  control: styles => ({ ...styles, borderColor: !isValid && '#dc3545' })
});

export default class SelectFromApi extends PureComponent {
  static propTypes = {
    api: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mapApiData: PropTypes.func,
    value: PropTypes.any,
    isValid: PropTypes.bool
  };

  static defaultProps = {
    mapApiData: null,
    isValid: false
  };

  source = axios.CancelToken.source();

  state = {
    options: [],
    isLoaded: false
  };

  componentDidMount() {
    this.onLoadOptions();
  }

  componentWillUnmount() {
    this.source.cancel('Api is being canceled');
  }

  onLoadOptions = async () => {
    const { api, mapApiData } = this.props;

    try {
      const data = await api(this.source.token);

      const options = typeof mapApiData === 'function' ? data.map(mapApiData) : data;

      this.setState({
        options,
        isLoaded: true
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message);
      } else {
        console.error(error);
      }
    }

    Promise.resolve();
  };

  onChange = (value, { name }) => {
    this.props.onChange({ target: { value, name } });
  };

  render() {
    /* eslint-disable-next-line no-unused-vars */
    const { api, mapApiData, isValid, ...props } = this.props;
    const { options } = this.state;
    /* Изначально использовал селект из бутстрапа, поэтому реализовал свое асинхронное получение данных,
    а не использовал AsyncSelect из react-select */

    return (
      <Select
        options={options}
        {...props}
        onChange={this.onChange}
        isClearable
        styles={selectStyles(isValid)}
      />
    );
  }
}
