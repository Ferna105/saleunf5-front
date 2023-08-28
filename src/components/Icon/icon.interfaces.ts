export enum Icons {
  Google = 'Google',
}

export interface IconProps {
  name: keyof typeof Icons;
}
