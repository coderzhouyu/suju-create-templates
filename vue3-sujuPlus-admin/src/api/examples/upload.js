import { requestClient } from '#/api/request';

export async function upload_file({
  file,
  onError,
  onProgress,
  onSuccess,
}) {
  try {
    onProgress?.({ percent: 0 });

    const data = await requestClient.upload('/upload', { file });

    onProgress?.({ percent: 100 });
    onSuccess?.(data, file);
  } catch (error) {
    onError?.(error instanceof Error ? error : new Error(String(error)));
  }
}
