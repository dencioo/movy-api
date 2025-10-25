import { Watchlist } from '../../models/watchlistModel.js';

export async function createWatchlist(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Watchlist name is required"
      })
    }

    const userId = req.user.id

    const watchlist = await Watchlist.create({
      user: userId,
      name,
      movies: []
    });

    return res.status(201).json({
      success: {
        message: "Watchlist created successfully",
        watchlist
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Failed to create watchlist"
    })
  }
}

export async function getUserWatchlists(req, res) {
  try {
    const userId = req.user.id;

    const watchlists = await Watchlist.find({user: userId});

    return res.status(200).json({
      watchlists
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Failed to fetch watchlists"
    })
  }
}

export async function getWatchlistById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const watchlist = await Watchlist.findOne({ 
      _id: id,
      user: userId 
    }).populate("movies");

    if (!watchlist) {
      return res.status(404).json({
        error: "Watchlist not found"
      })
    }

    return res.status(200).json({
      watchlist
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch watchlist in the database"
    })
  }
}

export async function renameWatchlist(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({
        error: "You need to rename your watchlist"
      })
    }

    const watchlist = await Watchlist.findOneAndUpdate(
      {_id: id, user: userId}, // only update if it's the user has access
      { name },
      {new: true } // return the updated doc
    );

    if (!watchlist) {
      return res.status(404).json({
        error: "Couldn't find watchlist"
      })
    }

    return res.status(200).json({
      succes: {
        message: "Renamed your watchlist successfully",
        watchlist
      }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to rename watchlist, sorry"
    })
  }
}

export async function deleteWatchlist(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await Watchlist.findOneAndDelete({
      _id: id,
      user: userId
    })

    if (!deleted) {
      return res.status(404).json({
        error: "Couldn't find watchlist"
      })
    }

    return res.status(200).json({
      success: {
        message: "Watchlist deleted successfully"
      }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to delete watchlist"
    })
  }
}

export async function addMovieToWatchlist(req, res) {
  try {
    const {id} = req.params;
    const { movieId } = req.body;
    const userId = req.user.id;

    const watchlist = await Watchlist.findOneAndUpdate(
      {_id: id, user: userId },
      { $addToSet: { movies: movieId}},
      { new: true }
    ).populate("movies");

    if (!watchlist) {
      return res.status(404).json({
        error: "Couldn't find the watchlist"
      })
    }

    return res.status(200).json({
      message: "Movie added to the watchlist",
      watchlist
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to add the movie"
    }
    )
  }
}

export async function removeMovieToWatchlist(req, res) {
  try {
    const { id, movieId } = req.params;
    const userId = req.user.id;

    const watchlist = await Watchlist.findOneAndUpdate(
      {_id: id, user: userId},
      { $pull: {
        movies: movieId
      }},
      { new: true }
    ).populate("movies");

    return res.status(200).json({
      success: {
        message: "Movie removed from watchlist",
        watchlist
      }
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to remove movie from watchlist"
    })
  }
}