interface Topic extends Section {
  sectionId?: string;
}

interface TopicDetails extends Topic {
  content: string;
}