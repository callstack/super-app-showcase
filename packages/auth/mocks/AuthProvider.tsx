import React from 'react';

interface CreateAuthProviderMockProps {
  isSignout?: boolean;
  isLoading?: boolean;
}

type AuthProviderMockProps = {
  [K in keyof CreateAuthProviderMockProps]-?: NonNullable<
    CreateAuthProviderMockProps[K]
  >;
};

export const createAuthProviderMock = ({
  isSignout = false,
  isLoading = false,
}: CreateAuthProviderMockProps) => {
  return ({
    children,
  }: {
    children: ({
      isSignout,
      isLoading,
    }: AuthProviderMockProps) => React.ReactNode;
  }) => {
    return <>{children({isSignout, isLoading})}</>;
  };
};
