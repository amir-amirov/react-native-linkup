import React, {Suspense} from 'react';
import theme from '../../theme';
import {scale} from '../../utils';
import {SvgProps} from 'react-native-svg';
import {lazy} from 'react';

const icons = {
  home: lazy(() => import('../../assets/icons/Home')),
  mail: lazy(() => import('../../assets/icons/Mail')),
  lock: lazy(() => import('../../assets/icons/Lock')),
  user: lazy(() => import('../../assets/icons/User')),
  heart: lazy(() => import('../../assets/icons/Heart')),
  plus: lazy(() => import('../../assets/icons/Plus')),
  search: lazy(() => import('../../assets/icons/Search')),
  location: lazy(() => import('../../assets/icons/Location')),
  call: lazy(() => import('../../assets/icons/Call')),
  camera: lazy(() => import('../../assets/icons/Camera')),
  edit: lazy(() => import('../../assets/icons/Edit')),
  arrowLeft: lazy(() => import('../../assets/icons/ArrowLeft')),
  threeDotsCircle: lazy(() => import('../../assets/icons/ThreeDotsCircle')),
  threeDotsHorizontal: lazy(
    () => import('../../assets/icons/ThreeDotsHorizontal'),
  ),
  comment: lazy(() => import('../../assets/icons/Comment')),
  share: lazy(() => import('../../assets/icons/Share')),
  send: lazy(() => import('../../assets/icons/Send')),
  delete: lazy(() => import('../../assets/icons/Delete')),
  logout: lazy(() => import('../../assets/icons/Logout')),
  image: lazy(() => import('../../assets/icons/Image')),
  video: lazy(() => import('../../assets/icons/Video')),
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
