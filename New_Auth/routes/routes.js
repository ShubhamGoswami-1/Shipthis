const express = require( 'express' );
const router = express.Router();
const db = require( '../data/database' );

// GET all TV shows/movies
// router.get( '/api/tvshows', async ( req, res ) => {
//   console.log("15 results");

//   // Set the limit and offset for the data you want to extract
//   const limit = 15;  // the number of items you want to extract
//   const offset = 0;  // the starting index of the items you want to extract

//   const results = [];

//   try {
  
//     let data1 = await db.getDb().collection( 'netflix_tit' ).find().limit( 15 ).toArray();
//     res.json(data1);
//   } catch ( error ) {
//     console.error( error );
//     res.status( 500 ).json( { message: error } );
//   }
// } );


//GET 15 Random Shows  (Applied Aggregation) 
router.get('/api/tvshows', async (req, res) => {
  const limit = 15;

  try {
    const pipeline = [
      { $sample: { size: limit } },
    ];
    const data = await db.getDb().collection('netflix_tit').aggregate(pipeline).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});




// GET a single TV show/movie by SHOW ID (s1, s2, s3 ....)

router.get( '/api/tvshows/:id', async ( req, res ) => {
  try {
    const id = req.params.id;
    //  || 
    let result;
    if(id.length > 5){
        result = await db.getDb().collection('netflix_tit').findOne({
          $or: [
            { title: { $regex: id, $options: "i" } }, // i option for case-insensitive search
            { cast: { $regex: id, $options: "i" } }
          ]
        });
    }
    else{
      result = await db.getDb().collection( 'netflix_tit' ).findOne( { show_id: id })
    }
    // if(!result){
    //   result = await 
    // }
    if ( result ) {
      res.status( 200 ).json( result );
    } else {
      res.status( 404 ).json( { message: 'TV show/movie not found' } );
    }
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message: 'Internal server error' } );
  }
} );

// search the movie with cast name or movie title 
router.get('/api/tvshow', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);
    const regex = new RegExp(searchTerm, 'i');
    const result = await db.collection('netflix_tit').find({
      $or: [
        { title: regex },
        { cast: regex }
      ]
    }).toArray();

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'No TV shows/movies found with the provided search term' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
