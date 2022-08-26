export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddSectionResult =
  | Section
  | ServerErrorResponse
  | ValidationFailureResponse;

export type AddTopicResult =
  | ServerErrorResponse
  | Topic
  | ValidationFailureResponse;

export type ArchiveSectionResult =
  | ServerErrorResponse
  | ServerSuccessResponse
  | ValidationFailureResponse;

export type ArchiveTopicResult =
  | ServerErrorResponse
  | ServerSuccessResponse
  | ValidationFailureResponse;

export type LoginResult = ServerErrorResponse | Tokens;

export type LogoutResult = ServerErrorResponse | ServerSuccessResponse;

export type Mutation = {
  __typename?: "Mutation";
  addSection?: Maybe<AddSectionResult>;
  addTopic?: Maybe<AddTopicResult>;
  archiveSection?: Maybe<ArchiveSectionResult>;
  archiveTopic?: Maybe<ArchiveTopicResult>;
  login?: Maybe<LoginResult>;
  logout?: Maybe<LogoutResult>;
  refreshToken?: Maybe<RefreshTokenResult>;
  updateSection?: Maybe<UpdateSectionResult>;
  updateTopic?: Maybe<UpdateTopicResult>;
};

export type MutationAddSectionArgs = {
  isArchived?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
};

export type MutationAddTopicArgs = {
  content: Scalars["String"];
  isArchived?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  sectionId: Scalars["String"];
};

export type MutationArchiveSectionArgs = {
  sectionId: Scalars["String"];
};

export type MutationArchiveTopicArgs = {
  topicId: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateSectionArgs = {
  isArchived?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  sectionId: Scalars["String"];
};

export type MutationUpdateTopicArgs = {
  content?: InputMaybe<Scalars["String"]>;
  isArchived?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  sectionId: Scalars["String"];
  topicId: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  activeSections?: Maybe<Array<Maybe<Section>>>;
  activeTopics?: Maybe<Array<Maybe<Topic>>>;
  section?: Maybe<SectionResult>;
  sections?: Maybe<Array<Maybe<Section>>>;
  topic?: Maybe<Topic>;
  topics?: Maybe<Array<Maybe<Topic>>>;
  topicsBySection?: Maybe<TopicResult>;
};

export type QuerySectionArgs = {
  sectionId: Scalars["ID"];
};

export type QueryTopicArgs = {
  sectionId: Scalars["ID"];
  topicId: Scalars["ID"];
};

export type QueryTopicsBySectionArgs = {
  sectionId: Scalars["ID"];
};

export type RefreshTokenResult = ServerErrorResponse | Token;

export type Section = {
  __typename?: "Section";
  id: Scalars["ID"];
  isArchived: Scalars["Boolean"];
  name: Scalars["String"];
};

export type SectionResult = Section | ValidationFailureResponse;

export type ServerErrorResponse = {
  __typename?: "ServerErrorResponse";
  code: Scalars["String"];
  message: Scalars["String"];
};

export type ServerSuccessResponse = {
  __typename?: "ServerSuccessResponse";
  message: Scalars["String"];
};

export type Token = {
  __typename?: "Token";
  token: Scalars["String"];
};

export type Tokens = {
  __typename?: "Tokens";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
};

export type Topic = {
  __typename?: "Topic";
  content?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isArchived: Scalars["Boolean"];
  name: Scalars["String"];
  sectionId: Scalars["ID"];
};

export type TopicResult = TopicsList | ValidationFailureResponse;

export type TopicsList = {
  __typename?: "TopicsList";
  list?: Maybe<Array<Maybe<Topic>>>;
};

export type UpdateSectionResult =
  | Section
  | ServerErrorResponse
  | ValidationFailureResponse;

export type UpdateTopicResult =
  | ServerErrorResponse
  | Topic
  | ValidationFailureResponse;

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["String"];
  password: Scalars["String"];
  permissions: UserPermissions;
};

export type UserPermissions = {
  __typename?: "UserPermissions";
  create: Scalars["Boolean"];
  delete: Scalars["Boolean"];
  edit: Scalars["Boolean"];
};

export type ValidationError = {
  __typename?: "ValidationError";
  code: Scalars["String"];
  message: Scalars["String"];
  path: Array<Maybe<Scalars["String"]>>;
};

export type ValidationFailureResponse = {
  __typename?: "ValidationFailureResponse";
  validationErrors: Array<Maybe<ValidationError>>;
};

export type TopicQueryVariables = Exact<{
  topicId: Scalars["ID"];
  sectionId: Scalars["ID"];
}>;

export type TopicQuery = {
  __typename?: "Query";
  topic?: {
    __typename?: "Topic";
    id: string;
    isArchived: boolean;
    name: string;
    sectionId: string;
    content?: string | null;
  } | null;
};

export type TopicsQueryVariables = Exact<{ [key: string]: never }>;

export type TopicsQuery = {
  __typename?: "Query";
  topics?: Array<{
    __typename?: "Topic";
    id: string;
    isArchived: boolean;
    name: string;
    sectionId: string;
    content?: string | null;
  } | null> | null;
};

export type TopicsBySectionQueryVariables = Exact<{
  sectionId: Scalars["ID"];
}>;

export type TopicsBySectionQuery = {
  __typename?: "Query";
  topicsBySection?:
    | {
        __typename?: "TopicsList";
        list?: Array<{
          __typename?: "Topic";
          id: string;
          isArchived: boolean;
          name: string;
          sectionId: string;
          content?: string | null;
        } | null> | null;
      }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type ActiveTopicsQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveTopicsQuery = {
  __typename?: "Query";
  activeTopics?: Array<{
    __typename?: "Topic";
    id: string;
    isArchived: boolean;
    name: string;
    sectionId: string;
    content?: string | null;
  } | null> | null;
};

export type SectionQueryVariables = Exact<{
  sectionId: Scalars["ID"];
}>;

export type SectionQuery = {
  __typename?: "Query";
  section?:
    | { __typename?: "Section"; id: string; isArchived: boolean; name: string }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type SectionsQueryVariables = Exact<{ [key: string]: never }>;

export type SectionsQuery = {
  __typename?: "Query";
  sections?: Array<{
    __typename?: "Section";
    id: string;
    isArchived: boolean;
    name: string;
  } | null> | null;
};

export type ActiveSectionsQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveSectionsQuery = {
  __typename?: "Query";
  activeSections?: Array<{
    __typename?: "Section";
    id: string;
    isArchived: boolean;
    name: string;
  } | null> | null;
};

export type AddSectionMutationVariables = Exact<{
  name: Scalars["String"];
  isArchived?: InputMaybe<Scalars["Boolean"]>;
}>;

export type AddSectionMutation = {
  __typename?: "Mutation";
  addSection?:
    | { __typename?: "Section"; id: string; isArchived: boolean; name: string }
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type ArchiveSectionMutationVariables = Exact<{
  sectionId: Scalars["String"];
}>;

export type ArchiveSectionMutation = {
  __typename?: "Mutation";
  archiveSection?:
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | { __typename?: "ServerSuccessResponse"; message: string }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type UpdateSectionMutationVariables = Exact<{
  sectionId: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  isArchived?: InputMaybe<Scalars["Boolean"]>;
}>;

export type UpdateSectionMutation = {
  __typename?: "Mutation";
  updateSection?:
    | { __typename?: "Section"; id: string; isArchived: boolean; name: string }
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type AddTopicMutationVariables = Exact<{
  sectionId: Scalars["String"];
  name: Scalars["String"];
  content: Scalars["String"];
  isArchived?: InputMaybe<Scalars["Boolean"]>;
}>;

export type AddTopicMutation = {
  __typename?: "Mutation";
  addTopic?:
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | {
        __typename?: "Topic";
        id: string;
        isArchived: boolean;
        name: string;
        sectionId: string;
        content?: string | null;
      }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type ArchiveTopicMutationVariables = Exact<{
  topicId: Scalars["String"];
}>;

export type ArchiveTopicMutation = {
  __typename?: "Mutation";
  archiveTopic?:
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | { __typename?: "ServerSuccessResponse"; message: string }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type UpdateTopicMutationVariables = Exact<{
  topicId: Scalars["String"];
  sectionId: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  isArchived?: InputMaybe<Scalars["Boolean"]>;
  content?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateTopicMutation = {
  __typename?: "Mutation";
  updateTopic?:
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | {
        __typename?: "Topic";
        id: string;
        isArchived: boolean;
        name: string;
        sectionId: string;
        content?: string | null;
      }
    | {
        __typename?: "ValidationFailureResponse";
        validationErrors: Array<{
          __typename?: "ValidationError";
          message: string;
          code: string;
          path: Array<string | null>;
        } | null>;
      }
    | null;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?:
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | { __typename?: "Tokens"; accessToken: string; refreshToken: string }
    | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: "Mutation";
  logout?:
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | { __typename?: "ServerSuccessResponse"; message: string }
    | null;
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken?:
    | { __typename?: "ServerErrorResponse"; message: string; code: string }
    | { __typename?: "Token"; token: string }
    | null;
};
