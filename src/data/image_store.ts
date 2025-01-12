export type ImageType = { id: number, url: string, author: string };
export const ALL_IMAGES: Array<ImageType> = [
    {
        id: 3,
        url: 'https://bar.com/img1',
        author: 'Lara Lobster'
    },
    {
        id: 2,
        url: 'https://baz.com/img2',
        author: 'Larry Lobster'
    },
    {
        id: 1,
        url: 'https://foo.com/img1',
        author: 'Bart Simpson'
    }
];