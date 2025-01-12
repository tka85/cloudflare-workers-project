import { ALL_IMAGES, ImageType } from "../data/image_store";
import { IRequest } from 'itty-router';

const createImage = async (request: IRequest): Promise<Response> => {
    const newImage: ImageType = await request.json();
    console.log(`>>> 1 `);

    ALL_IMAGES.unshift(newImage);
    console.log(`>>> 2 `);
    return new Response(JSON.stringify(newImage), {
        status: 201,
        headers: { 'content-type': 'application/json' },
    });
}

export default createImage;