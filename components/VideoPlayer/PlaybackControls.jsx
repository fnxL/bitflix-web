/* eslint-disable no-sparse-arrays */
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';
import { BsFiles } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import usePlaybackControls from '../../hooks/usePlaybackControls';
import { formatBytes } from '../../utils/utils';
import Button from './Button';
import styles from './controls.module.css';
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

const PlaybackControls = forwardRef(({ onToggleFullscreen }, ref) => {
  const { fullscreenRef } = ref;

  const sliderRef = useRef();
  ref.sliderRef = sliderRef;

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
    handleProgressMouseMove,
    handleSourceListMenuClick,
    hoverTime,
    mouseLeft,
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
                  <span className="time_range h-full w-full flex items-center">
                    <Slider
                      value={played * 100}
                      focusThumbOnChange={false}
                      getAriaValueText={() => elapsedTime}
                      onChange={handleSeekChange}
                      onChangeStart={handleSeekMouseDown}
                      onChangeEnd={handleSeekCommited}
                      sx={{
                        borderRadius: '0px',
                      }}
                      role="group"
                    >
                      <Tooltip
                        color="#f2f2f2"
                        portalProps={{ containerRef: fullscreenRef }}
                        offset={[mouseLeft, 8]}
                        placement="top-start"
                        label={hoverTime}
                        fontSize="lg"
                        bg="rgb(38,38,38)"
                      >
                        <SliderTrack
                          ref={sliderRef}
                          sx={{
                            height: '3.75px',
                            bg: 'gray',
                            border: 0,
                            transition:
                              'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,height 0.2s ease 0s',
                            _groupHover: { height: '7.7px' },
                          }}
                          onMouseMove={handleProgressMouseMove}
                        >
                          <span className="buffer_bar absolute left-0 z-0 top-auto" />
                          <SliderFilledTrack bg="red" sx={{ border: 0 }} />
                        </SliderTrack>
                      </Tooltip>
                      <Tooltip
                        color="#f2f2f2"
                        placement="top"
                        label={elapsedTime}
                        fontSize="lg"
                        bg="rgb(38,38,38)"
                      >
                        <SliderThumb
                          bg="red"
                          sx={{
                            height: '15px',
                            width: '15px',
                            _hover: {
                              height: '18px',
                              width: '18px',
                              transition: 'all 0.2s ease 0s',
                            },
                          }}
                        />
                      </Tooltip>
                    </Slider>
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
                  {/* Volume Slider */}
                  <Popover trigger="hover">
                    <PopoverTrigger>
                      <Button
                        onClick={toggleMute}
                        icon={muted ? <VolumeMuted /> : <VolumeFull />}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      width="auto"
                      bg="rgb(38,38,38)"
                      border="0"
                      _focus={{ boxShadow: 'none' }}
                    >
                      <PopoverBody>
                        <div className="rounded-[3px] h-[20vh] text-[8px] p-0 max-h-[200px] min-h-[100px] py-[10px] md:py-[20px]">
                          <Slider
                            min={0}
                            max={100}
                            value={volume * 100}
                            orientation="vertical"
                            onChange={handleVolumeChange}
                            onChangeEnd={handleVolumeChange}
                            focusThumbOnChange={false}
                            sx={{
                              borderRadius: '0px',
                            }}
                            role="group"
                          >
                            <SliderTrack width="12px" border="0">
                              <SliderFilledTrack bg="red" />
                            </SliderTrack>
                            <SliderThumb height="22.5px" width="22.5px" bg="red" />
                          </Slider>
                        </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* Title */}
                <div
                  className="invisible lg:visible flex title flex-grow min-h-0 min-w-0 relative ml-[5px] mr-[5px] pt-[5px]"
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
                  {/* Source List Menu */}

                  {selectedSourceList.length !== 0 && (
                    <Menu
                      offset={[isMobile ? -250 : 0, 10]}
                      isLazy
                      placement="top-start"
                      boundary="scrollParent"
                    >
                      <MenuButton
                        as={Button}
                        icon={
                          <BsFiles className="w-[20px] h-[25px] lg:h-[40px] lg:w-[40px] md:h-[33px] md:w-[30px]" />
                        }
                        bg="transparent"
                        _hover={{ bg: 'transparent', transform: 'scale(1.3)' }}
                        _focus={{ boxShadow: 'none' }}
                        _active={{ bg: 'transparent' }}
                      />
                      <MenuList
                        bg="rgb(38,38,38)"
                        border="0"
                        maxW={{ base: '360px', md: '500px', lg: '768px' }}
                        sx={{ overflowY: 'auto', maxH: isMobile ? '275px' : '600px' }}
                      >
                        {selectedSourceList.map((source, i) => (
                          <MenuItem
                            _hover={{ bg: 'rgba(0,0,0,0.3)' }}
                            key={`menuItem-${i}_${source.size}`}
                            _focus={{ bg: 'rgba(0,0,0,0.3)' }}
                            _active={{ bg: 'rgba(0,0,0,0.3)' }}
                            onClick={() => handleSourceListMenuClick(source)}
                          >
                            {source.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  )}
                  <Spacing />
                  {/* Source Information */}
                  <Popover trigger="hover">
                    <PopoverTrigger>
                      <Button icon={<Info />} />
                    </PopoverTrigger>
                    {currentSource && (
                      <PopoverContent
                        width="auto"
                        bg="rgb(38,38,38)"
                        border="0"
                        _focus={{ boxShadow: 'none' }}
                      >
                        <PopoverBody>
                          <div
                            className={`${
                              styles.menu
                            } pb-[8px] max-w-[150px] md:max-w-[250px] max-h-[400px] ${
                              isMobile && 'md:max-h-[250px]'
                            } lg:max-w-[350px] lg:max-h-[550px] flex flex-col overflow-hidden rounded-[0.8rem]`}
                          >
                            <h3 className={styles.menu_title}>Information</h3>
                            <ul>
                              <li>{currentSource?.name}</li>
                              <li>Size: {formatBytes(currentSource?.size)}</li>
                              <li>Sub: {subName}</li>
                            </ul>
                          </div>
                        </PopoverBody>
                      </PopoverContent>
                    )}
                  </Popover>
                  <Spacing />
                  {/* Quality and Subtitles  */}
                  <Popover trigger="hover" offset={[-125, 10]} placement="top">
                    <PopoverTrigger>
                      <Button icon={<Subtitles />} />
                    </PopoverTrigger>
                    {sourceList.length !== 0 && (
                      <PopoverContent
                        width="auto"
                        bg="rgb(38,38,38)"
                        border="0"
                        _focus={{ boxShadow: 'none' }}
                      >
                        <PopoverBody>
                          <div
                            className={`${styles.menu} ${styles.quality_menu} max-w-[350px] md:max-w-[350px] max-h-[250px] lg:max-w-[450px] lg:max-h-[550px] pb-40 inline-flex overflow-hidden rounded-[0.8rem]`}
                          >
                            <div className={`${styles.quality} flex-grow flex-shrink`}>
                              <h3 className={`${styles.menu_title} ${styles.quality_title}`}>
                                Quality
                              </h3>
                              <ul>
                                {sourceList.map((item) => {
                                  if (item.url) {
                                    return (
                                      <li
                                        onClick={() => handleSourceChange(item.quality)}
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
                              <div className={`${styles.quality} subtitles flex-grow flex-shrink`}>
                                <h3 className={`${styles.menu_title} ${styles.quality_title}`}>
                                  Subtitles
                                </h3>
                                <ul>
                                  <li onClick={handleSubChange}>
                                    {subsEnabled && <Selected />}English
                                  </li>
                                  <li onClick={handleTurnOffSub}>
                                    {!subsEnabled && <Selected />} Off
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </PopoverBody>
                      </PopoverContent>
                    )}
                  </Popover>
                  <Spacing />
                  <Button onClick={onToggleFullscreen} icon={<FullScreen />} />
                </div>
              </div>
            </div>
          </div>
          <Spacing type="vertical" />
        </div>

        <style jsx>{`
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
