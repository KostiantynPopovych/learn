import { memo } from 'react';
import GlobalContext from 'context/global';
import TopicDetailsContext from 'context/topicsDetails';
import AuthContext from 'context/auth';
import SectionsContext from 'context/sections';
import TopicsContext from 'context/topics';

export default memo(({ children }) => (
  <GlobalContext>
    <AuthContext>
      <TopicDetailsContext>
        <SectionsContext>
          <TopicsContext>{children}</TopicsContext>
        </SectionsContext>
      </TopicDetailsContext>
    </AuthContext>
  </GlobalContext>
));
