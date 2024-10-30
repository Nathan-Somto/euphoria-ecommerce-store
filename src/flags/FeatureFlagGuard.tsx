'use client';
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FLAGS, FeatureFlag } from './flags';

interface FeatureFlagGuardProps {
  flag: FeatureFlag;
  children: ReactNode;
  redirectUrl?: string;
}

const FeatureFlagGuard: React.FC<FeatureFlagGuardProps> = ({ flag, children, redirectUrl }) => {
  const router = useRouter();
  const isEnabled = FLAGS[flag];
  const [checking, setChecking] = React.useState(true);
  useEffect(() => {
    if (!isEnabled && redirectUrl) {
      router.replace(redirectUrl);
      return;
    }
    setChecking(false);
  }, [isEnabled, redirectUrl, router]);

  if (!isEnabled || checking) {
    return null;
  }

  return <>{children}</>;
};

export default FeatureFlagGuard;
