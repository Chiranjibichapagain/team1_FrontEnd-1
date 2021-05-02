import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaHeart, FaThumbsUp } from 'react-icons/fa';

import Button from '../Button';
import { useMatchInfo } from '../../hooks/useMatchData';
import { createMatch } from '../../services/matchService';
import { getOneCompany, likeTalent, superlikeTalent } from '../../services/userService';
import { checkMatch } from '../../Utils/checkMatch';

import './TalentCard.scss';
Modal.setAppElement('#root');
const TalentCard = ({ talent, userId, userType, setStatus, setPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchType, setMatchType] = useState('');

  const handleLike = async () => {
    likeTalent(userId, talent.id).then(async (response) => {
      if (response.data) {
        setStatus('liked');
        setTimeout(() => {
          setStatus('');
        }, 500);

        const { data } = await getOneCompany(userId);

        const isMatched = checkMatch(
          userId,
          userType,
          talent,
          data.likes,
          data.superLikes,
          data.jobs,
          null
        );

        if (isMatched === 'match') {
          console.log('it is a match');
          const matchInfo = { companyId: userId, talentId: talent.id, type: 'match' };
          createMatch(matchInfo).then((response) => {
            if (response.data) {
              setMatchType('match');
              setIsModalOpen(true);
            }
          });
        }

        if (isMatched === 'supermatch') {
          const matchInfo = { companyId: userId, talentId: talent.id, type: 'supermatch' };
          console.log('match-info', matchInfo);
          createMatch(matchInfo).then((response) => {
            if (response.data) {
              setMatchType('super-match');
              setIsModalOpen(true);
            }
          });
        }
      }
    });
  };

  const handleSuperLike = () => {
    superlikeTalent(userId, talent.id).then(async (response) => {
      if (response.data) {
        setStatus('liked');
        setTimeout(() => {
          setStatus('');
        }, 500);

        const { data } = await getOneCompany(userId);

        const isMatched = checkMatch(
          userId,
          userType,
          talent,
          data.likes,
          data.superLikes,
          data.jobs
        );

        if (isMatched === 'match') {
          console.log('it is a match');
          const matchInfo = { companyId: userId, talentId: talent.id, type: 'match' };
          createMatch(matchInfo).then((response) => {
            if (response.data) {
              setMatchType('match');
              setIsModalOpen(true);
            }
          });
        }
        if (isMatched === 'supermatch') {
          const matchInfo = { companyId: userId, talentId: talent.id, type: 'supermatch' };
          console.log('match-info', matchInfo);
          createMatch(matchInfo).then((response) => {
            if (response.data) {
              setMatchType('super-match');
              setIsModalOpen(true);
            }
          });
        }
      }
    });
  };

  const customStyles = {
    content: {
      background: '#17252a',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)'
    }
  };

  return (
    <section className="talent-card">
      <div className="talent-card__main">
        <div className="talent-card__head">
          <img className="talent-card__avatar" src={talent.photo} alt="talent profile" />
          <div className="talent-card__talent-info">
            <h2 className="talent-card__name">{`${talent.firstName} ${talent.lastName}`}</h2>
            <p className="talent-card__text talent-card__text--location">{talent.location}</p>
          </div>
        </div>
        <p className="talent-card__text talent-card__text--position">{talent.title}</p>
        <p className="talent-card__text talent-card__text--seniority">
          {talent.level}, &nbsp;
          {talent.type}
        </p>
        <div className="talent-card__skills">
          {talent.techs.map((item, index) => (
            <p className="talent-card__text talent-card__text--skill" key={index}>
              {item}, &nbsp;
            </p>
          ))}
        </div>
        <p className="talent-card__text talent-card__text--description">{talent.about}</p>
      </div>
      <div className="talent-card__icons">
        <FaHeart onClick={handleSuperLike} className="talent-card__icon " />
        <FaThumbsUp onClick={handleLike} className="talent-card__icon " />
      </div>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div onClick={() => setIsModalOpen(false)} className="close">
          X
        </div>
        <div className="TC-content">
          <h1 className="TC-content__title">{`It's a ${matchType}`}</h1>
          <p className="TC-content__text">
            {`Congratulations!! it is a ${matchType}. You can now start conversation`}
          </p>
          <div className="TC-content__btn-div">
            <Button
              modifier="light"
              text="Start Conversation"
              handleClick={() => setPage('messages')}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default TalentCard;
