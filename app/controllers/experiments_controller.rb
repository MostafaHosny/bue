class ExperimentsController < ApplicationController
    # before_action :set_experiment, only: [:show, :edit, :update, :destroy]
before_action :authenticate_user!
skip_before_action :verify_authenticity_token
require 'socket'
  # GET /experiments
  # GET /experiments.json
  def index
    # redirect_to :action=>'first'
    # render :first
    # @experiments = Experiment.all
  end

  # GET /experiments/1
  # GET /experiments/1.json
  def show
    if params[:id].to_i == 1
     render 'first'
   elsif params[:id].to_i == 2
     render 'oscillating'
   end
  end

  # GET /experiments/new
  def new
    @experiment = Experiment.new
  end

  # GET /experiments/1/edit
  def edit
  end

   # expirment 1
  def first
 
  end

  def oscillating
 
  end

  def send_to_rasp
    @sock = TCPSocket.new('41.41.206.79', 51717)
    # puts params[:coil]
    # puts params[:prm]

    coil = params[:coil].to_i
    prm = params[:prm].to_i
    
     @sock.write [0 , 0 , coil].pack('C*')
     @sock.write [01 , prm >> 8 , prm].pack('C*')
      
     @sock.close
    render json: {done: ""} ,status: 200 
  end

  # POST /experiments
  # POST /experiments.json
  def create
    @experiment = Experiment.new(experiment_params)

    respond_to do |format|
      if @experiment.save
        format.html { redirect_to @experiment, notice: 'Experiment was successfully created.' }
        format.json { render :show, status: :created, location: @experiment }
      else
        format.html { render :new }
        format.json { render json: @experiment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /experiments/1
  # PATCH/PUT /experiments/1.json
  def update
    respond_to do |format|
      if @experiment.update(experiment_params)
        format.html { redirect_to @experiment, notice: 'Experiment was successfully updated.' }
        format.json { render :show, status: :ok, location: @experiment }
      else
        format.html { render :edit }
        format.json { render json: @experiment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /experiments/1
  # DELETE /experiments/1.json
  def destroy
    @experiment.destroy
    respond_to do |format|
      format.html { redirect_to experiments_url, notice: 'Experiment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_experiment
      @experiment = Experiment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def experiment_params
      params.require(:experiment).permit(:name)
    end
end
