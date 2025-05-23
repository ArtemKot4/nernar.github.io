import { useCallback, useContext } from 'react';
import { ApiOptionsContext } from './ApiOptionsContext';

export default function ApiOptionsLayout({ className }: { className: string }) {
  const { hideInherited, setHideInherited } = useContext(ApiOptionsContext);
  const handleHideInherited = useCallback(() => {
    setHideInherited(!hideInherited);
  }, [hideInherited, setHideInherited]);

  return (
    <>
      <div className={className}>
        <div><b>Page Options</b></div>
        <label>
          <input checked={hideInherited} type="checkbox" onChange={handleHideInherited} />
          <span>Hide Inherited</span>
        </label>
        <div />
      </div>
    </>
  );
}
