export interface Task {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
}
