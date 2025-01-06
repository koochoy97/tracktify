export function Mountain_loader(props) {
  return (
    <>
      {props.show ? (
        <div className="flex justify-center w-full items-center h-full">
          <img
            src="/loader_mountain.gif"
            alt="loading"
            className={props.width}
          />
        </div>
      ) : null}
    </>
  );
}
