import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
	state = {
		movies: getMovies(),
		pagesSize: 4,
		currentPage: 1,
		genres: getGenres(),
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
		const { pagesSize, currentPage, movies: allMovies } = this.state;

		if (count === 0) {
			return <p>There are no movies in the database.</p>;
		}

		const movies = paginate(allMovies, currentPage, pagesSize);

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
						{movies.map((movie) => {
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

export default Movies;
