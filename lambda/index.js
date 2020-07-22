const AWS = require('aws-sdk')
const region = process.env.REGION
AWS.config.update({region: region})
var rekognition = new AWS.Rekognition({ region })

exports.handler = async (event) => {
	console.log(event);

  var params = {
    Image: {
      S3Object: {
				Bucket: "facial-db-us-east-1182825-dev", 
				Name: "public/" + event.arguments.imageName
      }
    }, 
    Attributes: [
      'ALL'
    ]
	};
	
	console.log(params);
 
	const result = await rekognition.detectFaces(params).promise();
	console.log(`result`, result);
	// {
	// 	FaceDetails: [
	// 		{
	// 			BoundingBox: [Object],
	// 			AgeRange: [Object],
	// 			Smile: [Object],
	// 			Eyeglasses: [Object],
	// 			Sunglasses: [Object],
	// 			Gender: [Object],
	// 			Beard: [Object],
	// 			Mustache: [Object],
	// 			EyesOpen: [Object],
	// 			MouthOpen: [Object],
	// 			Emotions: [Array],
	// 			Landmarks: [Array],
	// 			Pose: [Object],
	// 			Quality: [Object],
	// 			Confidence: 99.99742126464844
	// 		}
	// 	]
	// }
	// console.log(result.FaceDetails[0]);
	return {data : JSON.stringify(result)};
};