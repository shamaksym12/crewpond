import { actions } from '../../../../../utils';

const initialState = {
  isSubmitting: false,
  isJobsLoaded: false,
  jobs: [],
  isJobDeleted: false,
  isJobLoaded: false,
  job: {},
  isJobPicDeleted: false,
  isJobPicUpdated: false
};

const actionMap = {
  [actions.GET_JOBS_REQUEST]: state => ({ ...state, isSubmitting: true, isJobsLoaded: false }),
  [actions.GET_JOBS_SUCCESS]: (state, { result }) => ({
    ...state,
    isSubmitting: false, 
    isJobsLoaded: true,
    jobs: result.data,
  }),
  [actions.GET_JOBS_FAILURE]: state => ({ ...state, isSubmitting: false, isJobsLoaded: false }),

  
  [actions.DELETE_JOB_REQUEST]: state => ({ ...state, isSubmitting: true, isJobDeleted: false }),
  [actions.DELETE_JOB_SUCCESS]: state => ({ ...state, isSubmitting: false, isJobDeleted: true }),
  [actions.DELETE_JOB_FAILURE]: state => ({ ...state, isSubmitting: false, isJobDeleted: false }),

  [actions.GET_JOB_REQUEST]: state => ({ ...state, isJobLoaded: false }),
  [actions.GET_JOB_SUCCESS]: (state, { result }) => ({
    ...state,
    isJobLoaded: true,
    job: result.data,
  }),
  [actions.GET_JOB_FAILURE]: state => ({ ...state, isJobLoaded: false }),


  [actions.UPDATE_JOB_REQUEST]: state => ({ ...state, isSubmitting: true }),
  [actions.UPDATE_JOB_SUCCESS]: state => ({ ...state, isSubmitting: false }),
  [actions.UPDATE_JOB_FAILURE]: state => ({ ...state, isSubmitting: false }),
  
  [actions.ADMIN_DELETE_JOB_PIC_REQUEST]: state => ({ ...state, isSubmitting: true, isJobPicDeleted: false }),
  [actions.ADMIN_DELETE_JOB_PIC_SUCCESS]: state => ({ ...state, isSubmitting: false, isJobPicDeleted: true }),
  [actions.ADMIN_DELETE_JOB_PIC_FAILURE]: state => ({ ...state, isSubmitting: false, isJobPicDeleted: false }),

  [actions.ADMIN_JOB_PIC_UPDATE_REQUEST]: state => ({ ...state, isSubmitting: true }),
  [actions.ADMIN_JOB_PIC_UPDATE_SUCCESS]: state => ({ ...state, isSubmitting: false }),
  [actions.ADMIN_JOB_PIC_UPDATE_FAILURE]: state => ({ ...state, isSubmitting: false }),

};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
