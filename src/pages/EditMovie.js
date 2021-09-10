import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { id } = match.params;
    this.state = {
      movie: [],
      loading: true,
      id,
      atualizado: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const { id } = this.state;
    await this.getData(id);
  }

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    this.setState({
      atualizado: true,
    });
  }

  async getData(id) {
    const response = await movieAPI.getMovie(id);
    this.setState({
      movie: response,
      loading: false,
    });
  }

  render() {
    const { movie, loading, atualizado } = this.state;

    return (
      <div data-testid="edit-movie">
        {
          loading
            ? <Loading />
            : <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
        }
        {
          atualizado
            ? <Redirect to="/" />
            : null
        }

      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.func.isRequired,
};

export default EditMovie;
