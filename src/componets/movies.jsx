import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./pagination";

class Movies extends Component {
	state = {
		movies: getMovies(),
		pagesSize: 4,
		currentPage: 1,
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({
			currentPage: page,
		});
	};

	render() {
		const { length: count } = this.state.movies;
		const { pagesSize, currentPage } = this.state;
		if (this.state.movies.length === 0) {
			return <p>There are no movies in the database.</p>;
		} else {
			return (
				<React.Fragment>
					<p>Showing {count} movies in the database.</p>
					<table className='table'>
						<thead>
							<tr>
								<th>Title</th>
								<th>Genre</th>
								<th>Stock</th>
								<th>Rate</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{this.state.movies.map((movie, index) => {
								return (
									<tr key={movie._id}>
										<td>{movie.title}</td>
										<td>{movie.genre.name}</td>
										<td>{movie.numberInStock}</td>
										<td>{movie.dailyRentalRate}</td>
										<td>
											<Like
												liked={movie.liked}
												onClick={() => this.handleLike(movie)}
											/>
										</td>
										<td>
											<button
												type='button'
												className='btn btn-danger btn-sm'
												onClick={() => this.handleDelete(movie)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<Pagination
						itemsCount={count}
						pagesSize={pagesSize}
						onPageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</React.Fragment>
			);
		}
	}
}

export default Movies;
