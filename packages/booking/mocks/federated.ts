import {AppMock} from './App';

export default (module: string) => {
  switch (module) {
    case './App':
      return AppMock;
    default:
      throw new Error(`BookingMock: unknown module: ${module}`);
  }
};
