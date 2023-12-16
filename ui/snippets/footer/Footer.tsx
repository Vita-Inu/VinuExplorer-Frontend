import { Box, Grid, Flex, Text, Link, VStack, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import type { CustomLinksGroup } from 'types/footerLinks';

import config from 'configs/app';
import discordIcon from 'icons/social/discord.svg';
import gitIcon from 'icons/social/git.svg';
import mediumIcon from 'icons/social/medium_filled.svg';
import telegramIcon from 'icons/social/telegram_filled.svg';
import twitterIcon from 'icons/social/tweet.svg';
import type { ResourceError } from 'lib/api/resources';
import useFetch from 'lib/hooks/useFetch';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import ColorModeToggler from '../header/ColorModeToggler';
import FooterLinkItem from './FooterLinkItem';
import IntTxsIndexingStatus from './IntTxsIndexingStatus';

const MAX_LINKS_COLUMNS = 3;

const Footer = () => {
  const BLOCKSCOUT_LINKS = [
    {
      icon: gitIcon,
      iconSize: '18px',
      text: 'GitHub',
      url: 'https://github.com/VinuChain',
    },
    {
      icon: twitterIcon,
      iconSize: '18px',
      text: 'Twitter',
      url: 'https://twitter.com/vinuchain',
    },
    {
      icon: discordIcon,
      iconSize: '18px',
      text: 'Discord',
      url: 'https://discord.gg/vinu',
    },
    {
      icon: telegramIcon,
      iconSize: '18px',
      text: 'Telegram',
      url: 'https://t.me/vitainu',
    },
    {
      icon: mediumIcon,
      iconSize: '18px',
      text: 'Medium',
      url: 'https://medium.com/vinuchain',
    },
  ];

  const fetch = useFetch();

  const { isPending, data: linksData } = useQuery<unknown, ResourceError<unknown>, Array<CustomLinksGroup>>({
    queryKey: [ 'footer-links' ],
    queryFn: async() => fetch(config.UI.footer.links || '', undefined, { resource: 'footer-links' }),
    enabled: Boolean(config.UI.footer.links),
    staleTime: Infinity,
  });

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      px={{ base: 4, lg: 12 }}
      py={{ base: 4, lg: 9 }}
      borderTop="1px solid"
      borderColor="divider"
      as="footer"
      columnGap="100px"
    >
      <Box flexGrow="1" mb={{ base: 8, lg: 0 }}>
        <Flex flexWrap="wrap" columnGap={ 8 } rowGap={ 6 }>
          <ColorModeToggler/>
          { !config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus/> }
          <NetworkAddToWallet/>
        </Flex>
        <Box mt={{ base: 5, lg: '44px' }}>
          <Link fontSize="xs" href="https://vinu.org">vinu.org</Link>
        </Box>
        <Text mt={ 3 } maxW={{ base: 'unset', lg: '470px' }} fontSize="xs">
            VinuExplorer is the official scanner for VinuChain, the world’s first determinably feeless, EVM L1.
        </Text>
      </Box>
      <Grid
        gap={{ base: 6, lg: 12 }}
        gridTemplateColumns={ config.UI.footer.links ?
          { base: 'repeat(auto-fill, 160px)', lg: `repeat(${ (linksData?.length || MAX_LINKS_COLUMNS) + 1 }, 160px)` } :
          'auto'
        }
      >
        <Box minW="160px" w={ config.UI.footer.links ? '160px' : '100%' }>
          { config.UI.footer.links && <Text fontWeight={ 500 } mb={ 3 }>Blockscout</Text> }
          <Grid
            gap={ 1 }
            gridTemplateColumns={
              config.UI.footer.links ?
                '160px' :
                {
                  base: 'repeat(auto-fill, 160px)',
                  lg: 'repeat(2, 160px)',
                  xl: 'repeat(4, 160px)',
                }
            }
            gridTemplateRows={{
              base: 'auto',
              lg: config.UI.footer.links ? 'auto' : 'repeat(4, auto)',
              xl: config.UI.footer.links ? 'auto' : 'repeat(2, auto)',
            }}
            gridAutoFlow={{ base: 'row', lg: config.UI.footer.links ? 'row' : 'column' }}
            mt={{ base: 0, lg: config.UI.footer.links ? 0 : '100px' }}
          >
            { BLOCKSCOUT_LINKS.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
          </Grid>
        </Box>
        { config.UI.footer.links && isPending && (
          Array.from(Array(3)).map((i, index) => (
            <Box minW="160px" key={ index }>
              <Skeleton w="120px" h="20px" mb={ 6 }/>
              <VStack spacing={ 5 } alignItems="start" mb={ 2 }>
                { Array.from(Array(5)).map((i, index) => <Skeleton w="160px" h="14px" key={ index }/>) }
              </VStack>
            </Box>
          ))
        ) }
        { config.UI.footer.links && linksData && (
          linksData.slice(0, MAX_LINKS_COLUMNS).map(linkGroup => (
            <Box minW="160px" key={ linkGroup.title }>
              <Text fontWeight={ 500 } mb={ 3 }>{ linkGroup.title }</Text>
              <VStack spacing={ 1 } alignItems="start">
                { linkGroup.links.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
              </VStack>
            </Box>
          ))
        ) }
      </Grid>
    </Flex>
  );
};

export default Footer;
