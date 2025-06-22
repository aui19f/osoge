type modalProps = {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
};

export function Frame({ header, body, footer }: modalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg w-96">
        {header && (
          <div className="flex flex-col items-center py-10 bg-slate-50 gap-2.5 rounded-t-lg p-6">
            {header}
          </div>
        )}

        <div className="bg-slate-100 px-10 py-6 flex flex-col gap-2.5">
          {body}
        </div>

        {footer && (
          <div className="bg-slate-100 p-4 flex gap-2.5 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
