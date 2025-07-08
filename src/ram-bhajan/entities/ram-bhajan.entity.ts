export class AudioData {
  audioSrc: string;
  imageSrc: string;
  auther: string;
  title: string;
}

export class CardItem {
  img: string;
  title: string;
  category: string;
  desc: string;
  audioData: AudioData;
  rating: string;
  price: string;
}

export class RamBhajan {
  id: string; // for identification
  categoryName: string;
  cardItems: CardItem[];
}
