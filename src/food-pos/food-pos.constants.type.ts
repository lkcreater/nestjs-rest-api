export enum EFoodPosConstants {
  prefixTable = 'fpos',
}

export const nameTable = (name: string): string => {
  return `${EFoodPosConstants.prefixTable}-${name}`;
};
