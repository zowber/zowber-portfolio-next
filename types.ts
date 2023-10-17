export type Label = {
  id: number;
  name: string;
};

export type Meta = {
  client: string;
  location: string;
  duration: string;
  role: string;
};

export type Subsection = {
  type: string;
  heading: string;
  content: string;
};

export type Section = {
  subsections: Subsection[];
};

export type CaseStudy = {
  id: number;
  name: string;
  description: string;
  heroImgUrl: string;
  heroImgRawUrl: string;
  labels: Label[];
  meta: Meta[];
  sections: Section[];
};

export type Err = {
  message: string;
};
