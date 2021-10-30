import React, {memo, useMemo} from 'react';
import sm from './sm.module.scss';
import cn from 'classnames'

interface Props {
  isVisible?: boolean;
}

const Pulse = ({ isVisible }: Props) => (
  <div className={cn(sm.Pulse, useMemo(() => ({
    [sm.Pulse_Visible]: isVisible
  }), [isVisible]))} />
);

export default memo(Pulse);