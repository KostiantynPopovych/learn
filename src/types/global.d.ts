type Nullable<T = null> = T | null;

interface WithId {
  id: string;
}

interface KeyValue<T> {
  [key: string]: T;
}
