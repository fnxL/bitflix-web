import styles from './VideoPlayer.module.css';

function VideoPlayer() {
  return (
    <div className="watch_video h-full left-0 absolute m-0 overflow-hidden p-0 top-0 w-full">
      <div className="video_player_view h-full left-0 m-0 overflow-hidden absolute p-0 top-0 w-full">
        <div className={styles.video_canvas}>
          <div className="relative w-full h-full overflow-hidden">
            <video className="w-full h-full" src="/video.mp4" />
          </div>
        </div>
        <div className="flex relative flex-col h-full w-full">
          <div className={`${styles.back_button}`}>
            <div className="medium h-[5.2rem] w-[5.2rem] relative">
              <button>
                <div className={styles.back_icon}>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6.357 11H21v2H6.357l4.585 5.35-1.518 1.3L2.866 12l6.558-7.65 1.518 1.3L6.357 11z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="watch-video--bottom-controls-container relative flex min-h-0 min-w-0 items-end justify-center">
            <div
              className="ltr-jezwko h-full m-0 pointer-events-auto relative w-full px-[20px]"
              data-uia="controls-standard"
            >
              <div className="ltr-1bt0omd relative">
                <div className="flex h-full relative w-full">
                  <div className="ltr-hpbgml flex min-h-0 min-w-0 relative items-center flex-grow">
                    <div
                      aria-orientation="horizontal"
                      className="h-[22.5px] cursor-pointer flex flex-col justify-center relative w-full"
                      data-uia="timeline"
                      max="8158191"
                      min="0"
                      role="slider"
                      tabindex="-1"
                    >
                      <div
                        data-uia="timeline-bar"
                        className="h-[3.75px] relative w-full flex items-center"
                        style={{ backgroundColor: 'gray', transition: 'height 0.2s ease 0s' }}
                      >
                        <div
                          className="absolute h-full top-0"
                          style={{ backgroundColor: 'lightgray', width: '66.6px' }}
                        ></div>
                        <div
                          className="ltr-1c4ubff h-full left-0 top-0 absolute"
                          style={{ backgroundColor: 'red', width: '13.58px' }}
                        ></div>
                        <div
                          aria-label="Seek time scrubber"
                          tabindex="0"
                          style={{
                            transform: 'translateY(-50%)',
                            backgroundColor: 'red',
                            transition: 'transform 0.2s ease 0s',
                            left: 'calc(13.58px - 7.5px',
                          }}
                          className="ltr-uwc8j6 w-[15px] h-[15px] rounded-full absolute top-[50%]"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="ltr-6alejv items-center justify-center flex min-h-0 min-w-0 relative pl-[10px]">
                    <span
                      className="ltr-pw0kjc text-white text-[16px]"
                      data-uia="controls-time-remaining"
                    >
                      2:14:56
                    </span>
                  </div>
                </div>
                <div className="ltr-1i33xgl h-[30px] min-h-[30px] min-w-full w-full flex relative"></div>
                <div className="ltr-1bt0omd relative">
                  <div className="ltr-1i33xgl h-full w-full relative flex">
                    <div className="ltr-hpbgml flex min-h-0 min-w-0 relative">
                      <div className="h-[52px] w-[52px] relative ltr-1dcjcj4">
                        <button
                          aria-label="Play"
                          className=" ltr-1enhvti border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                          style={{ transition: 'transform 150ms ease 0s', borderRadius: '2px' }}
                          data-uia="control-play-pause-play"
                        >
                          <div
                            className="w-[44px] h-[44px] flex items-center justify-center ltr-18dhnor"
                            role="presentation"
                          >
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                              <g id="play">
                                <polygon fill="currentColor" points="6 4 21 12 6 20"></polygon>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div className="ltr-1i33xgl flex h-full relative w-[30px] min-w-[30px]"></div>
                      <div className="h-[52px] w-[52px] relative">
                        <button
                          aria-label="Seek Back"
                          className=" ltr-1enhvti border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                          style={{ transition: 'transform 150ms ease 0s', borderRadius: '2px' }}
                          data-uia="control-back10"
                        >
                          <div
                            className="h-[44px] w-[44px] flex items-center justify-center ltr-18dhnor"
                            role="presentation"
                          >
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                              <g id="back-10">
                                <path
                                  fill="currentColor"
                                  d="M12.4521632,5.01256342 L13.8137335,6.91876181 L12.1862665,8.08123819 L9.27109639,4 L12.1862665,-0.0812381937 L13.8137335,1.08123819 L12.4365066,3.0093558 C17.7568368,3.23786247 22,7.6234093 22,13 C22,18.5228475 17.5228475,23 12,23 C6.4771525,23 2,18.5228475 2,13 C2,11.0297737 2.57187523,9.14190637 3.62872363,7.52804389 L5.30188812,8.6237266 C4.4566948,9.91438076 4,11.4220159 4,13 C4,17.418278 7.581722,21 12,21 C16.418278,21 20,17.418278 20,13 C20,8.73346691 16.6600802,5.24701388 12.4521632,5.01256342 Z M8.47,17 L8.47,11.41 L6.81,11.92 L6.81,10.75 L9.79,9.91 L9.79,17 L8.47,17 Z M14.31,17.15 C13.7499972,17.15 13.2600021,17.0016682 12.84,16.705 C12.4199979,16.4083319 12.0950011,15.9883361 11.865,15.445 C11.6349988,14.901664 11.52,14.2600037 11.52,13.52 C11.52,12.786663 11.6349988,12.1466694 11.865,11.6 C12.0950011,11.0533306 12.4199979,10.6316682 12.84,10.335 C13.2600021,10.0383319 13.7499972,9.89 14.31,9.89 C14.8700028,9.89 15.3599979,10.0383319 15.78,10.335 C16.2000021,10.6316682 16.5249988,11.0533306 16.755,11.6 C16.9850012,12.1466694 17.1,12.786663 17.1,13.52 C17.1,14.2600037 16.9850012,14.901664 16.755,15.445 C16.5249988,15.9883361 16.2000021,16.4083319 15.78,16.705 C15.3599979,17.0016682 14.8700028,17.15 14.31,17.15 Z M14.31,15.97 C14.7500022,15.97 15.1016653,15.7533355 15.365,15.32 C15.6283346,14.8866645 15.76,14.2866705 15.76,13.52 C15.76,12.7533295 15.6283346,12.1533355 15.365,11.72 C15.1016653,11.2866645 14.7500022,11.07 14.31,11.07 C13.8699978,11.07 13.5183346,11.2866645 13.255,11.72 C12.9916653,12.1533355 12.86,12.7533295 12.86,13.52 C12.86,14.2866705 12.9916653,14.8866645 13.255,15.32 C13.5183346,15.7533355 13.8699978,15.97 14.31,15.97 Z M7.72890361,4 L9.81373347,6.91876181 L8.18626653,8.08123819 L5.27109639,4 L8.18626653,-0.0812381937 L9.81373347,1.08123819 L7.72890361,4 Z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div className="ltr-1i33xgl flex h-full relative w-[30px] min-w-[30px]"></div>
                      <div className="h-[52px] w-[52px] relative">
                        <button
                          aria-label="Seek Forward"
                          className=" ltr-1enhvti border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                          style={{ transition: 'transform 150ms ease 0s', borderRadius: '2px' }}
                          data-uia="control-forward10"
                        >
                          <div
                            className="h-[44px] w-[44px] flex items-center justify-center ltr-18dhnor"
                            role="presentation"
                          >
                            <svg className="w-full h-full" viewBox="0 0 24 24">
                              <g id="forward-10">
                                <path
                                  fill="currentColor"
                                  d="M11.8291288,3.00143042 L10.4575629,1.08123819 L12.0850299,-0.0812381937 L15.0002,4 L12.0850299,8.08123819 L10.4575629,6.91876181 L11.8267943,5.0018379 C7.48849327,5.09398699 4,8.63960287 4,13 C4,17.418278 7.581722,21 12,21 C16.418278,21 20,17.418278 20,13 C20,11.4220159 19.5433052,9.91438076 18.6981119,8.6237266 L20.3712764,7.52804389 C21.4281248,9.14190637 22,11.0297737 22,13 C22,18.5228475 17.5228475,23 12,23 C6.4771525,23 2,18.5228475 2,13 C2,7.53422249 6.38510184,3.09264039 11.8291288,3.00143042 Z M8.56,17 L8.56,11.41 L6.9,11.92 L6.9,10.75 L9.88,9.91 L9.88,17 L8.56,17 Z M14.4,17.15 C13.8399972,17.15 13.3500021,17.0016682 12.93,16.705 C12.5099979,16.4083318 12.1850012,15.988336 11.955,15.445 C11.7249989,14.9016639 11.61,14.2600037 11.61,13.52 C11.61,12.786663 11.7249989,12.1466694 11.955,11.6 C12.1850012,11.0533306 12.5099979,10.6316681 12.93,10.335 C13.3500021,10.0383318 13.8399972,9.89 14.4,9.89 C14.9600028,9.89 15.4499979,10.0383318 15.87,10.335 C16.2900021,10.6316681 16.6149988,11.0533306 16.845,11.6 C17.0750012,12.1466694 17.19,12.786663 17.19,13.52 C17.19,14.2600037 17.0750012,14.9016639 16.845,15.445 C16.6149988,15.988336 16.2900021,16.4083318 15.87,16.705 C15.4499979,17.0016682 14.9600028,17.15 14.4,17.15 Z M14.4,15.97 C14.8400022,15.97 15.1916654,15.7533355 15.455,15.32 C15.7183347,14.8866645 15.85,14.2866705 15.85,13.52 C15.85,12.7533295 15.7183347,12.1533355 15.455,11.72 C15.1916654,11.2866645 14.8400022,11.07 14.4,11.07 C13.9599978,11.07 13.6083346,11.2866645 13.345,11.72 C13.0816654,12.1533355 12.95,12.7533295 12.95,13.52 C12.95,14.2866705 13.0816654,14.8866645 13.345,15.32 C13.6083346,15.7533355 13.9599978,15.97 14.4,15.97 Z M14.4575629,6.91876181 L16.5423928,4 L14.4575629,1.08123819 L16.0850299,-0.0812381937 L19.0002,4 L16.0850299,8.08123819 L14.4575629,6.91876181 Z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div className="ltr-1i33xgl flex h-full relative w-[30px] min-w-[30px]"></div>

                      <div className="h-[52px] w-[52px] relative">
                        <button
                          aria-label="Volume"
                          className=" ltr-1enhvti border-none bg-transparent text-white cursor-pointer m-0 p-0 relative"
                          style={{ transition: 'transform 150ms ease 0s', borderRadius: '2px' }}
                          data-uia="control-volume-high"
                        >
                          <div
                            className="h-[44px] w-[44px] flex items-center justify-center ltr-18dhnor"
                            role="presentation"
                          >
                            <svg viewBox="0 0 24 24" className="h-full w-full">
                              <g id="volume-high">
                                <path
                                  fill="currentColor"
                                  d="M9,7.82842712 L6.82842712,10 L4,10 L4,14 L6.82842712,14 L9,16.1715729 L9,7.82842712 Z M11,21 L6,16 L2,16 L2,8 L6,8 L11,3 L11,21 Z M13.7437869,16.3889482 L12.3295734,14.9747347 C13.9546583,13.3496497 13.9546583,10.7148664 12.3295734,9.08978146 L13.7437869,7.6755679 C16.1499205,10.0817014 16.1499205,13.9828147 13.7437869,16.3889482 Z M16.2137399,18.2137399 L14.7995264,16.7995264 C17.4324159,14.1666368 17.4324159,9.89787935 14.7995264,7.26498977 L16.2137399,5.8507762 C19.6276781,9.26471437 19.6276781,14.7998018 16.2137399,18.2137399 Z M18.6836929,20.0385316 L17.2694793,18.6243181 C20.9101736,14.9836239 20.9101736,9.08089228 17.2694793,5.44019807 L18.6836929,4.02598451 C23.1054357,8.4477273 23.1054357,15.6167888 18.6836929,20.0385316 Z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div
                      className="ltr-1fkysoc flex flex-grow min-h-0 min-w-0 relative ml-[5px] mr-[5px] pt-[5px]"
                      style={{ flexBasis: '14px' }}
                    >
                      <div className="ltr-1i33xgl flex h-full relative w-[30px] min-w-[30px]"></div>
                      <div
                        className="overflow-hidden text-center overflow-ellipsis whitespace-nowrap w-full text-[20px]"
                        data-uia="video-title"
                      >
                        Fast &amp; Furious Presents: Hobbs &amp; Shaw
                      </div>
                    </div>
                    <div className="ltr-hpbgml flex min-h-0 min-w-0 relative justify-end">
                      <div className="flex h-full relative w-[30px] min-w-[30px]"></div>
                      <div className="h-[52px w-[52px] relative">
                        <button
                          aria-label="Report a playback problem to Netflix."
                          className="bg-transparent border-none text-white m-0 p-0 relative "
                          style={{ borderRadius: '2px', transition: 'transform 150ms ease 0s' }}
                          data-uia="control-question"
                        >
                          <div
                            className="h-[44px] w-[44px] flex items-center justify-center"
                            role="presentation"
                          >
                            <svg className="w-full h-full" viewBox="0 0 24 24">
                              <g id="question">
                                <path
                                  fill="currentColor"
                                  d="M22,12 C22,17.5232847 17.5232847,22 12,22 C6.47671525,22 2,17.5232847 2,12 C2,6.47671525 6.47671525,2 12,2 C17.5232847,2 22,6.47671525 22,12 Z M20,12 C20,7.58128475 16.4187153,4 12,4 C7.58128475,4 4,7.58128475 4,12 C4,16.4187153 7.58128475,20 12,20 C16.4187153,20 20,16.4187153 20,12 Z M10.656,13.946 L10.656,13.61 C10.656,13.0126637 10.7653322,12.5113354 10.984,12.106 C11.2026678,11.7006646 11.6319968,11.3113352 12.272,10.938 C12.8160027,10.6179984 13.1706658,10.3593343 13.336,10.162 C13.5013342,9.96466568 13.584,9.74866784 13.584,9.514 C13.584,9.23666528 13.450668,8.99933432 13.184,8.802 C12.917332,8.60466568 12.5600022,8.506 12.112,8.506 C11.6426643,8.506 11.2640014,8.60733232 10.976,8.81 C10.6879986,9.01266768 10.506667,9.26866512 10.432,9.578 L8,9.578 C8.08533376,8.94866352 8.30933152,8.38333584 8.672,7.882 C9.03466848,7.38066416 9.51999696,6.9833348 10.128,6.69 C10.736003,6.3966652 11.4506626,6.25 12.272,6.25 C13.0293371,6.25 13.7013304,6.38599864 14.288,6.658 C14.8746696,6.93000136 15.3333317,7.30866424 15.664,7.794 C15.9946683,8.27933576 16.16,8.84733008 16.16,9.498 C16.16,10.0953363 16.0000016,10.6073312 15.68,11.034 C15.3599984,11.4606688 14.8853365,11.8606648 14.256,12.234 C13.7546642,12.5326682 13.4293341,12.7966655 13.28,13.026 C13.1306659,13.2553345 13.056,13.4926654 13.056,13.738 L13.056,13.946 L10.656,13.946 Z M11.968,17.882 C11.5519979,17.882 11.1946682,17.7326682 10.896,17.434 C10.5973318,17.1353318 10.448,16.7726688 10.448,16.346 C10.448,15.9193312 10.5973318,15.5566682 10.896,15.258 C11.1946682,14.9593318 11.5519979,14.81 11.968,14.81 C12.3946688,14.81 12.7573318,14.9593318 13.056,15.258 C13.3546682,15.5566682 13.504,15.9193312 13.504,16.346 C13.504,16.7726688 13.3546682,17.1353318 13.056,17.434 C12.7573318,17.7326682 12.3946688,17.882 11.968,17.882 Z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div className="flex h-full relative w-[30px] min-w-[30px]"></div>
                      <div className="h-[52px w-[52px] relative">
                        <button
                          aria-label="Audio &amp; Subtitles"
                          className="bg-transparent border-none text-white m-0 p-0 relative "
                          style={{ borderRadius: '2px', transition: 'transform 150ms ease 0s' }}
                          data-uia="control-audio-subtitle"
                        >
                          <div
                            className="h-[44px] w-[44px] flex items-center justify-center"
                            role="presentation"
                          >
                            <svg className="w-full h-full" viewBox="0 0 24 24">
                              <g id="audio-subtitles">
                                <path
                                  fill="currentColor"
                                  d="M5,15 L5,13 L12,13 L12,15 L5,15 Z M14,15 L14,13 L19,13 L19,15 L14,15 Z M10,9 L10,11 L5,11 L5,9 L10,9 Z M11.9998571,11 L12.0001429,9.00000001 L19.0001429,9.00100001 L18.9998571,11.001 L11.9998571,11 Z M17,17 L21,17 L21,5 L3,5 L3,17 L12.9968832,17 L17,19.4392488 L17,17 Z M1,3 L23,3 L23,19 L19,19 L19,22.9999671 L12.4355463,19 L1,19 L1,3 Z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div className="flex h-full relative w-[30px] min-w-[30px]"></div>

                      <div className="h-[52px w-[52px] relative">
                        <button
                          aria-label="1x (Normal)"
                          className="bg-transparent border-none text-white m-0 p-0 relative "
                          style={{ borderRadius: '2px', transition: 'transform 150ms ease 0s' }}
                          data-uia="control-speed"
                        >
                          <div
                            className="h-[44px] w-[44px] flex items-center justify-center"
                            role="presentation"
                          >
                            <svg viewBox="3 3 28 28" className="w-full h-full">
                              <g id="speed">
                                <path
                                  fill="currentColor"
                                  d="M19.8023846,13.7111538 L22.0437692,15.0580769 L19.2865317,19.6534728 C19.4959852,20.029472 19.6153846,20.4622373 19.6153846,20.9224231 C19.6153846,22.3648077 18.4423846,23.5378077 17,23.5378077 C15.5576154,23.5378077 14.3846154,22.3648077 14.3846154,20.9224231 C14.3846154,19.4800385 15.5576154,18.3070385 17,18.3070385 C17.0149054,18.3070385 17.0297821,18.3071637 17.044629,18.3074133 L19.8023846,13.7111538 Z M28.7025597,25.4286405 C27.4615385,24.8461538 27.4615385,24.8461538 26.3609633,24.2636672 C27.0809129,22.8165686 27.4611462,21.2406017 27.4611462,19.6153846 C27.4611462,13.8370647 22.7779276,9.15384615 16.9996077,9.15384615 C11.2221213,9.15384615 6.53806923,13.8375388 6.53806923,19.6153846 C6.53806923,21.2391793 6.91888033,22.8151015 7.63955975,24.2636672 C6.53846154,24.8461538 6.53846154,24.8461538 5.29796333,25.4286405 C4.39964336,23.6230174 3.92268462,21.6492043 3.92268462,19.6153846 C3.92268462,12.3930568 9.77772922,6.53846154 16.9996077,6.53846154 C24.2223647,6.53846154 30.0765308,12.3926276 30.0765308,19.6153846 C30.0765308,21.6502951 29.600283,23.6242168 28.7025597,25.4286405 Z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <div className="flex h-full relative w-[30px] min-w-[30px]"></div>

                      <div className="h-[52px w-[52px] relative">
                        <button
                          aria-label="Full screen"
                          className="bg-transparent border-none text-white m-0 p-0 relative "
                          style={{ borderRadius: '2px', transition: 'transform 150ms ease 0s' }}
                          data-uia="control-fullscreen-enter"
                        >
                          <div
                            className="h-[44px] w-[44px] flex items-center justify-center"
                            role="presentation"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              data-uia="control-fullscreen-enter"
                              className="w-full h-full"
                            >
                              <g id="fullscreen-on">
                                <path
                                  fill="currentColor"
                                  d="M4,6 L4,10 L2,10 L2,4 L8,4 L8,6 L4,6 Z M4,18 L8,18 L8,20 L2,20 L2,14 L4,14 L4,18 Z M6,8 L18,8 L18,16 L6,16 L6,8 Z M20,6 L16,6 L16,4 L22,4 L22,10 L20,10 L20,6 Z M20,18 L20,14 L22,14 L22,20 L16,20 L16,18 L20,18 Z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative w-full min-w-full h-[30px] min-h-[30px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
