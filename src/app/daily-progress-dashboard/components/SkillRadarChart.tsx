'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SkillRadarInner = dynamic(() => import('./SkillRadarInner'), {
  ssr: false,
});

export default function SkillRadarChart() {
  return <SkillRadarInner />;
}
