export interface APIResponse {
  images: Image[];
  after?: string;
}

export interface Image {
  title: string;
  image: string;
  thumbnail: string;
  author: string;
  source: string;
  created_utc: number;
}
