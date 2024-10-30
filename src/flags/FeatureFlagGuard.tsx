'use client';
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {FLAGS, FeatureFlag } from './flags';

interface FeatureFlagGuardProps {
  flag: FeatureFlag;
  children: ReactNode;
  redirectUrl?: string;
}

const FeatureFlagGuard: React.FC<FeatureFlagGuardProps> = ({ flag, children, redirectUrl }) => {
  const router = useRouter();
  const isEnabled = FLAGS[flag];

  useEffect(() => {
    if (!isEnabled && redirectUrl) {
      router.push(redirectUrl);
    }
  }, [isEnabled, redirectUrl, router]);

  if (!isEnabled) {
    return null;
  }

  return <>{children}</>;
};

export default FeatureFlagGuard;
