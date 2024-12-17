export async function handleError(message: string, status: number) {
  return new Response(
    JSON.stringify({
      success: false,
      message
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
