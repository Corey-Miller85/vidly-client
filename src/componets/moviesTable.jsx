import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
	columns = [
		{ path: "title", label: "Title" },
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
			),
		},
		{
			key: "delete",
			content: (movie) => (
				<button
					type='button'
					className='btn btn-danger btn-sm'
					onClick={() => this.props.onDelete(movie)}
				>
					Delete
				</button>
			),
		},
	];
	render() {
		const { movies, sortColumn, onSort } = this.props;

		return (
			<Table
				columns={this.columns}
				data={movies}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;
