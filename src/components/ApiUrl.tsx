'use client';

import { useApiUrl } from '@/hooks/useApiUrl';

export default function ApiUrl() {
  const apiUrl = useApiUrl();
  if (apiUrl) {
    return <div>API URL: {apiUrl}</div>;
  } else {
    return <div></div>;
  }
}
