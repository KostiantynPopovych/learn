interface Topic extends Section {
  sectionId?: string;
  isArchived?: boolean;
}

interface TopicDetails extends Topic {
  content: string;
}
