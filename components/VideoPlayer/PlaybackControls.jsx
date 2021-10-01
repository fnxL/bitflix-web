/* eslint-disable no-sparse-arrays */
import { Menu, MenuItem, Tooltip } from '@mui/material';
import MButton from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { forwardRef, useState } from 'react';
import useVideoPlayerStore from '../../store/videoPlayerStore';
import { formatBytes, ProgressBarStyles, VolumeSliderStyles } from '../../utils/utils';
import Button from './Button';
import {
  FullScreen,
  Info,
  Pause,
  Play,
  SeekBack,
  SeekForward,
  Selected,
  Subtitles,
  VolumeFull,
  VolumeMuted,
} from './Icons';
import Spacing from './Spacing';
import ToolTip from './ToolTip';
import usePlaybackControls from '../../hooks/usePlaybackControls';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip
      enterTouchDelay={0}
      placement="top"
      title={<div className="text-[18px] bg-[rgb(38,38,38)]">{value}</div>}
    >
      {children}
    </Tooltip>
  );
}

const PlaybackControls = forwardRef(({ onToggleFullscreen }, ref) => {
  const { fullscreenRef } = ref;

  const {
    handleSeekBack,
    handleSeekChange,
    handleSeekCommited,
    handleSeekForward,
    handleSeekMouseDown,
    handleSourceChange,
    handleSubChange,
    handleTurnOffSub,
    handleVolumeChange,
    played,
    elapsedTime,
    timeLeft,
    togglePlayback,
    playing,
    volume,
    toggleMute,
    muted,
    title,
    selectedSourceList,
    currentSource,
    subName,
    vttURL,
    subsEnabled,
    loaded,
    sourceList,
  } = usePlaybackControls(ref);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClick = (source) => {
    source.selected = true;
    useVideoPlayerStore.setState({ currentSource: source });
    setAnchorEl(null);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <div className="bottom_controls_container relative w-full flex min-h-0 min-w-0 items-end justify-center">
        <div
          className="h-full m-0 pointer-events-auto relative w-full px-[20px]"
          data-uia="controls-standard"
        >
          <div className="relative">
            <div className="flex h-full relative w-full">
              <div className="flex min-h-0 min-w-0 relative items-center flex-grow">
                <div className="horizontal_progress_bar h-[22.5px] cursor-pointer flex justify-center items-center relative w-full">
                  <span className="buffer_bar absolute left-0 z-0 top-auto" />

                  <span className="time_range h-full w-full flex items-center">
                    <Slider
                      sx={ProgressBarStyles}
                      value={played * 100}
                      components={{
                        ValueLabel: ValueLabelComponent,
                      }}
                      valueLabelDisplay="auto"
                      valueLabelFormat={() => elapsedTime}
                      onChange={handleSeekChange}
                      onMouseDown={handleSeekMouseDown}
                      onChangeCommitted={handleSeekCommited}
                    />
                  </span>
                </div>
              </div>
              <div className="timeLeft items-center justify-center flex min-h-0 min-w-0 relative pl-[10px]">
                <span className="text-white text-[16px]">{timeLeft}</span>
              </div>
            </div>

            <Spacing type="vertical" />

            <div className="buttons_container relative">
              <div className="h-full w-full relative flex">
                <div className="buttons_left flex min-h-0 min-w-0 relative">
                  <Button onClick={togglePlayback} icon={playing ? <Pause /> : <Play />} />

                  <Spacing />

                  <Button onClick={handleSeekBack} icon={<SeekBack />} />

                  <Spacing />

                  <Button onClick={handleSeekForward} icon={<SeekForward />} />

                  <Spacing />

                  <ToolTip
                    PopperProps={{ container: fullscreenRef.current }}
                    title={
                      <div className="rounded-[3px] text-[8px] p-0 h-[20vh] max-h-[200px] min-h-[100px] py-[20px]">
                        <Slider
                          value={volume * 100}
                          min={0}
                          max={100}
                          sx={VolumeSliderStyles}
                          orientation="vertical"
                          onChange={handleVolumeChange}
                          onChangeCommitted={handleVolumeChange}
                        />
                      </div>
                    }
                  >
                    <Button onClick={toggleMute} icon={muted ? <VolumeMuted /> : <VolumeFull />} />
                  </ToolTip>
                </div>
                <div
                  className="title flex flex-grow min-h-0 min-w-0 relative ml-[5px] mr-[5px] pt-[5px]"
                  style={{ flexBasis: '14px' }}
                >
                  <Spacing />

                  <div
                    className="overflow-hidden text-center overflow-ellipsis whitespace-nowrap w-full text-[20px]"
                    data-uia="video-title"
                  >
                    {title}
                  </div>
                </div>
                <div className="buttons_right flex min-h-0 min-w-0 relative justify-end">
                  <Spacing />

                  <MButton
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Source
                  </MButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    container={fullscreenRef.current}
                    onClose={handleClose}
                    sx={{
                      '.MuiMenu-paper': {
                        backgroundColor: 'rgb(38, 38, 38)',
                        color: 'white',
                      },
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {selectedSourceList.map((source, i) => (
                      <MenuItem
                        key={`menuItem-${i}_${source.size}`}
                        onClick={() => handleMenuClick(source)}
                      >
                        {source.name}
                      </MenuItem>
                    ))}
                  </Menu>
                  <Spacing />

                  <ToolTip
                    PopperProps={{ container: fullscreenRef.current }}
                    title={
                      <div className="menu pb-[8px] max-w-[350px] flex flex-col overflow-hidden rounded-[0.8rem] ">
                        <h3 className="menu_title">Information</h3>
                        <ul>
                          <li>{currentSource?.name}</li>
                          <li>Size: {formatBytes(currentSource?.size)}</li>
                          <li>Sub: {subName}</li>
                        </ul>
                      </div>
                    }
                  >
                    <Button icon={<Info />} />
                  </ToolTip>

                  <Spacing />

                  <ToolTip
                    PopperProps={{ container: fullscreenRef.current }}
                    title={
                      <div className="menu pb-40 inline-flex overflow-hidden rounded-[0.8rem] whitespace-nowrap">
                        <div className="quality flex-grow flex-shrink">
                          <h3 className="menu_title">Quality</h3>
                          <ul>
                            {sourceList.map((item) => {
                              if (item.url) {
                                return (
                                  <li
                                    onClick={(e) => handleSourceChange(item.quality)}
                                    key={item.url}
                                  >
                                    {item.selected && <Selected />} {item.quality}
                                  </li>
                                );
                              }
                              return null;
                            })}
                          </ul>
                        </div>
                        {vttURL && (
                          <div className="subtitles quality flex-grow flex-shrink">
                            <h3 className="menu_title">Subtitles</h3>
                            <ul>
                              <li onClick={handleSubChange}>
                                {subsEnabled && <Selected />}English
                              </li>
                              <li onClick={handleTurnOffSub}>{!subsEnabled && <Selected />} Off</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    }
                  >
                    <Button icon={<Subtitles />} />
                  </ToolTip>

                  <Spacing />

                  <Button onClick={onToggleFullscreen} icon={<FullScreen />} />
                </div>
              </div>
            </div>
          </div>
          <Spacing type="vertical" />
        </div>

        <style jsx>{`
          .menu {
            background: rgb(38, 38, 38);
            user-select: none;
          }
          .quality {
            flex-basis: 0%;
          }

          .menu_title {
            color: white;
            font-weight: bold;
            margin-bottom: 0px;
            margin-top: 0px;
            letter-spacing: 0.01rem;
            line-height: 34px;
            font-size: 28px;
            padding: 21px 60px;
          }

          .menu_title ul {
            list-style: none;
            margin: 0px;
            padding: 0px 0px 8px;
          }

          .menu ul li {
            cursor: pointer;
            position: relative;
            padding: 21px 60px;
            line-height: 26px;
            font-size: 21px;
          }

          .menu ul li:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }

          .buffer_bar {
            height: 3.75px;
            width: ${parseFloat(loaded * 100)}%;
            background-color: lightgray;
            transition: height 0.2s ease 0s;
          }

          .horizontal_progress_bar:hover .buffer_bar {
            height: 7.5px;
          }
        `}</style>
      </div>
    </>
  );
});

PlaybackControls.displayName = 'PlaybackControls';

export default PlaybackControls;
