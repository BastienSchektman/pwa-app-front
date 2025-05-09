import React from 'react';
import { styled } from '@mui/material/styles';
import DefaultProfile from 'assets/images/default_profile.png';

const Img = styled('img')<{ size: number }>(({ size }) => `
  border-radius: 50%;
  width: ${`${size}px`};
  height: ${`${size}px`};
`);

type Props = {
  picturePath?: string;
  size?: number;
};

function ProfilePicture({ picturePath = DefaultProfile, size = 46 }: Props) {
  return (
    <Img size={size} src={picturePath} alt="profile-picture" />
  );
}

export default ProfilePicture;
