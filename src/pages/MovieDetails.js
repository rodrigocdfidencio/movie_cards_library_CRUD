import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { id } = params;
    this.state = {
      data: [],
      loading: true,
      id,
      deleted: false,
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    const { id } = this.state;
    const response = await movieAPI.getMovie(id);
    this.setState({
      data: response,
      loading: false,
    });
  }

  async deleteMovie(id) {
    await movieAPI.deleteMovie(id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { data } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = data;
    const { loading, deleted } = this.state;
    if (deleted) {
      return <Redirect to="/" />;
    }
    return (
      loading
        ? <Loading />
        : (
          <div data-testid="movie-details">
            <img alt="Movie Cover" src={ `../${imagePath}` } />
            <p>{ `Title: ${title}` }</p>
            <p>{ `Subtitle: ${subtitle}` }</p>
            <p>{ `Storyline: ${storyline}` }</p>
            <p>{ `Genre: ${genre}` }</p>
            <p>{ `Rating: ${rating}` }</p>
            <Link to={ `/movies/${id}/edit` }> EDITAR </Link>
            <Link to="/" onClick={ () => { this.deleteMovie(id); } }> DELETAR </Link>
            <Link to="/">VOLTAR</Link>
          </div>
        )
    );
  }
}

MovieDetails.propTypes = {
  params: PropTypes.func.isRequired,
  match: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default MovieDetails;
