import React, {Suspense} from 'react';
import theme from '../../theme';
import {scale} from '../../utils';
import {SvgProps} from 'react-native-svg';
import {lazy} from 'react';

const icons = {
  home: lazy(() => import('./Home')),
  mail: lazy(() => import('./Mail')),
  lock: lazy(() => import('./Lock')),
  user: lazy(() => import('./User')),
  heart: lazy(() => import('./Heart')),
  plus: lazy(() => import('./Plus')),
  search: lazy(() => import('./Search')),
  location: lazy(() => import('./Location')),
  call: lazy(() => import('./Call')),
  camera: lazy(() => import('./Camera')),
  edit: lazy(() => import('./Edit')),
  arrowLeft: lazy(() => import('./ArrowLeft')),
  threeDotsCircle: lazy(() => import('./ThreeDotsCircle')),
  threeDotsHorizontal: lazy(() => import('./ThreeDotsHorizontal')),
  comment: lazy(() => import('./Comment')),
  share: lazy(() => import('./Share')),
  send: lazy(() => import('./Send')),
  delete: lazy(() => import('./Delete')),
  logout: lazy(() => import('./Logout')),
  image: lazy(() => import('./Image')),
  video: lazy(() => import('./Video')),
} as const;

type IconName = keyof typeof icons;

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
}

const Icon: React.FC<IconProps> = ({name, ...props}) => {
  const IconComponent = icons[name];
  return (
    <Suspense fallback={null}>
      <IconComponent
        height={props.size || scale(24)}
        width={props.size || scale(24)}
        strokeWidth={props.strokeWidth || scale(1.9)}
        color={theme.palette.textLight}
        {...props}
      />
    </Suspense>
  );
};
export default React.memo(Icon);
