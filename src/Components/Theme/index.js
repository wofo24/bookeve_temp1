import React from 'react'

export default function index() {
    // const posts = useSelector((state) => state.posts);
  // const error = useSelector((state) => state.error);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);

  // const [buttonSettings, setButtonSettings] = useState({
  //   color: 'blue',
  //   fontFamily: 'Arial, sans-serif',
  //   textColor: 'white',
  //   background: 'green',
  // });
  // const [heading_Settings, setHeading_Settings] = useState({
  //   color: 'blue',
  //   fontFamily: 'Arial, sans-serif',
  // });
  // const handleSettingsChange = (newSettings) => {
  //   setButtonSettings(newSettings);
  // };
  // const handleHeadingSettingsChange = (newSettings) => {
  //   setHeading_Settings(newSettings);
  // };
  // console.log(posts, 'posts')
  return (
    <div> {/* <div style={{ margin: 'auto' }}>
    <h1>Customizable Button Demo</h1>

    <Theme_Button  {...buttonSettings} label='Hello Aman' />
    <div>
      <label>Button Color:</label>
      <input
        type="color"
        value={buttonSettings.color}
        onChange={(e) =>
          handleSettingsChange({ ...buttonSettings, color: e.target.value })
        }
      />
    </div>
    <div>
      <label>Font Family:</label>
      <select
        value={buttonSettings.fontFamily}
        onChange={(e) =>
          handleSettingsChange({
            ...buttonSettings,
            fontFamily: e.target.value,
          })
        }
      >
        <option value="Arial, sans-serif">Arial</option>
        <option value="Times New Roman, serif">Times New Roman</option>
        <option value="Verdana, sans-serif">Verdana</option>
      </select>
    </div>
    <div>
      <label>Text Color:</label>
      <input
        type="color"
        value={buttonSettings.textColor}
        onChange={(e) =>
          handleSettingsChange({
            ...buttonSettings,
            textColor: e.target.value,
          })
        }
      />
    </div>
    <div>
      <label>Background Color:</label>
      <input
        type="color"
        value={buttonSettings.background}
        onChange={(e) =>
          handleSettingsChange({
            ...buttonSettings,
            background: e.target.value,
          })
        }
      />
    </div>
    ////////////////////////////////
    <div style={{ margin: '50px' }}>


      <Theme_Heading   {...heading_Settings} label={'Testing content ever'} />

      <div>
        <label>Font Family:</label>
        <select
          value={buttonSettings.fontFamily}
          onChange={(e) =>
            handleHeadingSettingsChange({
              ...buttonSettings,
              fontFamily: e.target.value,
            })
          }
        >
          <option value="Arial, sans-serif">Arial</option>
          <option value="Times New Roman, serif">Times New Roman</option>
          <option value="Verdana, sans-serif">Verdana</option>
        </select>
      </div>
      <div>
        <label>Text Color:</label>
        <input
          type="color"
          value={buttonSettings.textColor}
          onChange={(e) =>
            handleHeadingSettingsChange({
              ...buttonSettings,
              textColor: e.target.value,
            })
          }
        />
      </div>

    </div>
  </div> */}</div>
  )
}
