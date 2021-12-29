import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'

import data from '../assets/data';
import styles from './styles.module.css';

export default function App() {
  const [open, set] = useState(false)

  const springApi = useSpringRef()
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
    },
  })

  const transApi = useSpringRef()
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])

  return (
    <div className={styles.wrapper}>
      <Container>
        <Link to="/">
          <Typography variant="h1">
            Home
          </Typography>
        </Link>
      </Container>
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
        onClick={() => set(open => !open)}>
        {transition((style, item) => (
          <animated.div
            className={styles.item}
            style={{ ...style, background: item.css }}
          >
            {item.content}
          </animated.div>
        ))}
      </animated.div>
    </div>
  )
}