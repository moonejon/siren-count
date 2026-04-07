export default function StateMonitor({ state }: { state: unknown }) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <pre
      style={{
        position: "fixed",
        bottom: 8,
        right: 8,
        maxWidth: 320,
        maxHeight: 200,
        overflow: "auto",
        fontSize: 11,
        background: "rgba(0,0,0,0.85)",
        color: "#0f0",
        padding: 8,
        borderRadius: 6,
        zIndex: 9999,
      }}
    >
      {JSON.stringify(state, null, 2)}
    </pre>
  );
}