const express = require( 'express' );
const router = express.Router();
const db = require( '../data/database' );
const jwt = require( "jsonwebtoken" )
const bcrypt = require( "bcryptjs" );


router.post( "/login", async function ( req, res ) {
  const userData = req.body;
  console.log( userData );
  const enteredEmail = userData.email; // userData['email']
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection( "users" )
    .findOne( { email: enteredEmail } );

  if ( !existingUser ) {
    res.status( 404 ).json( { message: 'Login Unsuccessful' } );
  };
  // req.session.save(function() {
  //   res.redirect("/login");
  // });
  // return;

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if ( !passwordsAreEqual ) {
    res.status( 404 ).json( { message: 'Login Unsuccessful' } );
  }

  jwt.sign( userData, 'super-secret', { expiresIn: '1h' }, ( err, accessToken ) => {
    if ( err ) {
      console.log( err, "hello" );
    }
    res.json( { accessToken, userData } );
  } );
} );




//prev
// router.get( '/api/tvshows', authenticateToken, async ( req, res ) => {

//   const token = ( req.headers.authorization ).toString()
//   const realToken = token.slice( 7, token.length )
//   console.log( realToken, "Thids is te headers :)" )
//   jwt.verify( realToken, 'super-secret', function ( err, decoded ) {
//     if ( err ) {
//       console.error( err );
//     } else {
//       userData = decoded
//     }
//   } );
//   const limit = 15;

//   // console.log(req.headers);
//   // console.log(req.cookies.token);
//   try {
//     const pipeline = [
//       { $sample: { size: limit } },
//     ];
//     // const data = await db.getDb().collection( 'netflix_tit' ).aggregate( pipeline ).toArray();
//     // Check if the user is older than 18 years
//     if ( userData.age < 18 ) {

//       console.log( typeof ( userData.age ) )
//       result = await db.getDb().collection( 'netflix_tit' ).find( { rating: { $ne: 'R' } } ).limit( 15 ).toArray();
//       res.json( result );

//       // console.log('hello',result)
//     }

//     else {
//       const result = await db.getDb().collection( 'netflix_tit' ).aggregate( pipeline ).toArray();
//       res.json( result );
//     }


//   } catch ( error ) {
//     console.error( error );
//     res.status( 500 ).json( { message: error } );
//   }
// } );


// Sorted with date
router.get( '/api/tvshows', authenticateToken, async ( req, res ) => {

  console.log("Here");
  const token = ( req.headers.authorization ).toString()
  const realToken = token.slice( 7, token.length )
  console.log( realToken, "Thids is te headers :)" )
  jwt.verify( realToken, 'super-secret', function ( err, decoded ) {
    if ( err ) {
      console.error( err );
    } else {
      userData = decoded
    }
  } );
  const limit = 15;


  const result = await db.getDb().collection('netflix_tit').find().toArray();
  result.sort((a, b) => {
    const dateA = new Date(a.date_added);
    const dateB = new Date(b.date_added);
    return dateA - dateB;
  })

  console.log(result.slice(0, 15));
  res.json(result.slice(0, 15));
});


//////


// function preventDuplicateHeaders(req, res, next) {
//   if (!res.headersSent) {
//     next();
//   } else {
//     console.log('Headers already sent');
//   }
// }




// GET a single TV show/movie by SHOW ID (s1, s2, s3 ....)

router.get( '/api/tvshows/:id?', async ( req, res ) => {


  let type = req.query.tvshow
  console.log( typeof ( type ) )
  try {
    const id = req.params.id;
    console.log( id );
    //  || 
    let result;
    if ( id.length > 5 ) {

      // if ( userData.age < 18 ) {

      //   console.log(typeof(userData.age),"hh")
      //   result = await db.getDb().collection( 'netflix_tit' ).find({rating: { $ne: 'R' }} ).limit(15).toArray();
      //   res.json( result );

      //   console.log('hello',result)
      //   result = await db.getDb().collection( 'netflix_tit' ).find( {
      //     $or: [
      //       { title: { $regex: id, $options: "i" }  }, // i option for case-insensitive search
      //       { cast: { $regex: id, $options: "i" } },
      //       { type: { $regex: id, $options: "i" } }
      //     ]
      //   } );
      // }   
      // else {

      // }

      result = await db.getDb().collection( 'netflix_tit' ).findOne( {
        $or: [
          { title: { $regex: id, $options: "i" } }, // i option for case-insensitive search
          { cast: { $regex: id, $options: "i" } },
          { type: { $regex: id, $options: "i" } }
        ]
      } );

    }
    else {
      result = await db.getDb().collection( 'netflix_tit' ).findOne( {
        $or: [
          { show_id: { $regex: id, $options: "i" } }, // i option for case-insensitive search
          { type: { $regex: id, $options: "i" } }
        ]
      } )
    }
    if ( result ) {
      console.log( result )

      const data = result.type === type

      if ( type !== "undefined" ) {

        if ( data === true ) {
          res.status( 200 ).json( result );
        }
        else {
          res.status( 200 ).json( "Data Not Found ss" );
        }

      }

      if ( type === "undefined" ) {
        res.status( 200 ).json( result );
      }

      else {
        res.status( 404 ).json( { message: 'TV show/movie not found' } );
      }


    }
    // if ( result ) {
    //   res.status( 200 ).json( result );
    // } else {
    //   res.status( 404 ).json( { message: 'TV show/movie not found' } );
    // }
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message: 'Internal server error' } );
  }
} );



//Filter Functionality

// router.get( '/api/showtv', async ( req, res ) => {

//   const data = await db.getDb().collection( 'netflix_tit' ).find( { type: 'TV Show' } ).limit( 15 ).toArray();
//   console.log( data );
//   // data.filter()

//   res.send( data );
// } )


//FIlter based on age

// router.get('api/showbasedAge',async(req,res)=>{
//   const data = await db.getDb().collection( 'netflix_tit' ).find( { } ).toArray();
// })


// router.get( '/api/movie', async ( req, res ) => {

//   const data = await db.getDb().collection( 'netflix_tit' ).find( { type: 'Movie' } ).limit( 15 ).toArray();
//   console.log( data );
//   // data.filter()

//   res.send( data );
// } )

// search the movie with cast name or movie title 
router.get( '/api/tvshow', async ( req, res ) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log( searchTerm );
    const regex = new RegExp( searchTerm, 'i' );
    const result = await db.collection( 'netflix_tit' ).find( {
      $or: [
        { title: regex },
        { cast: regex }
      ]
    } ).toArray();

    if ( result ) {
      res.status( 200 ).json( result );
    } else {
      res.status( 404 ).json( { message: 'No TV shows/movies found with the provided search term' } );
    }
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message: 'Internal server error' } );
  }
} );

function authenticateToken( req, res, next ) {
  const authHeader = req.headers['authorization'];
  if ( typeof authHeader !== 'undefined' ) {
    const token = authHeader.split( ' ' )[1];
    req.token = token;
    jwt.verify( token, 'super-secret', ( err, authData ) => {
      if ( err ) {
        res.sendStatus( 403 );
      } else {
        req.user = authData;
        next();
      }
    } );
    // next();
  }
  else {
    res.send( {
      result: "Token is not valid"
    } )
  }
}
module.exports = router;
