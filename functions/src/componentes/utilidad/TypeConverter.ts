
export const playlistConverter = (
    doc: FirebaseFirestore.DocumentData,
) : IPlayList => {
  const ipl : IPlayList = {
    description: typeof doc.description == "string" ? doc.description: "",
    imgUrl: typeof doc.imgUrl == "string" ? doc.imgUrl: "",
    likes: Array.isArray(doc.likes) ? doc.likes : [],
    name: typeof doc.name == "string" ? doc.name : "",
    plid: typeof doc.plid == "string" ? doc.plid : "",
    uid: typeof doc.uid == "string"? doc.uid : "",
    videos: Array.isArray(doc.videos) ? doc.videos: [],
    numLikes: Array.isArray(doc.likes) ? doc.likes.length : 0,
  };
  return ipl;
};

export interface IPlayList {
  plid: string,
  uid: string,
  name: string,
  description: string,
  imgUrl: string,
  likes: string[]
  videos: string[]
  numLikes: number
}
